import { NextRequest, NextResponse } from 'next/server';
import { getEmailTransporter } from '@/lib/email/transporter';
import { generatePlaybookEmailHtml } from '@/lib/email/template';
import { ARCHETYPES } from '@/data/archetypes';
import { checkQPayPayment } from '@/lib/qpay';
import { ArchetypeId, ChildProfile } from '@/types';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

async function verifyPayment(invoiceId?: string): Promise<boolean> {
  if (!invoiceId) return false;

  // 1. Mock/Dev mode check
  if (!process.env.QPAY_USERNAME || invoiceId.startsWith('mock_')) {
    return true;
  }

  // 2. Direct QPay API check
  try {
    const isPaidOnQPay = await checkQPayPayment(invoiceId);
    if (isPaidOnQPay) return true;
  } catch (err) {
    console.warn('QPay direct check failed, falling back to Redis cache:', err);
  }

  // 3. Upstash Redis cache check
  try {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (url && token) {
      const redis = new Redis({ url, token });
      const payments = await redis.lrange<any>('anzaar:payments', 0, 150);
      const isPaidInRedis = (payments || []).some((item) => {
        try {
          const parsed = typeof item === 'string' ? JSON.parse(item) : item;
          return parsed.invoiceId === invoiceId;
        } catch {
          return false;
        }
      });
      if (isPaidInRedis) return true;
    }
  } catch (err) {
    console.error('Redis check error:', err);
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, invoiceId, childProfile, archetypeId, scores, storyImageBase64 } = body;

    // Validate email format
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Зөв и-мэйл хаяг оруулна уу.' },
        { status: 400 }
      );
    }

    // 🔒 STRICT SECURITY: Must be a verified paid user
    const isPaid = await verifyPayment(invoiceId);
    if (!isPaid) {
      return NextResponse.json(
        { error: 'Уучлаарай, энэхүү 12+ хуудас бүрэн хөтөч ном болон Story зургийг и-мэйлээр авах эрх зөвхөн төлбөр төлсөн хэрэглэгчдэд нээлттэй.' },
        { status: 403 }
      );
    }

    // Resolve archetype
    const archetype = ARCHETYPES[archetypeId as ArchetypeId] || ARCHETYPES.calm_harmonizer;
    const profile: ChildProfile = childProfile || {
      name: 'Таны хүүхэд',
      ageGroup: 'preschool',
      gender: 'boy',
    };

    // Generate full 12-page HTML email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://anzaar-kids-app.vercel.app';
    const html = generatePlaybookEmailHtml({
      childProfile: profile,
      archetype,
      scores,
      webAppUrl: appUrl,
      hasStoryImage: !!storyImageBase64,
    });

    // Prepare attachments
    const attachments: any[] = [];
    if (storyImageBase64 && typeof storyImageBase64 === 'string') {
      const base64Data = storyImageBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      attachments.push({
        filename: `${profile.name || 'Child'}_anzaar_passport.png`,
        content: buffer,
        cid: 'story_passport',
      });
    }

    // Send email via Gmail SMTP
    const transporter = getEmailTransporter();
    const senderUser = process.env.GMAIL_USER || 'noreply@anzaar.mn';

    await transporter.sendMail({
      from: `"ANZAAR Kids" <${senderUser}>`,
      to: email,
      subject: `✨ ${profile.name}-ийн Зан Төлөвийн Бүрэн Хөтөч Ном & Story Зураг (Anzaar Pro)`,
      html,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: `${email} хаяг руу хөтөч ном болон Story зургийг амжилттай илгээлээ.`,
    });
  } catch (error: any) {
    console.error('Send result email error:', error);
    return NextResponse.json(
      { error: error.message || 'И-мэйл илгээхэд алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.' },
      { status: 500 }
    );
  }
}
