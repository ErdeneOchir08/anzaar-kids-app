import { NextRequest, NextResponse } from 'next/server';
import { recordAnalyticsEvent } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const event = await recordAnalyticsEvent({
      type: body.type || 'PAGE_VIEW',
      childName: body.childName || undefined,
      ageGroup: body.ageGroup || undefined,
      archetypeId: body.archetypeId || undefined,
      archetypeTitle: body.archetypeTitle || undefined,
      invoiceId: body.invoiceId || undefined,
      amount: body.amount || undefined,
      userAgent: req.headers.get('user-agent') || undefined,
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error: any) {
    console.error('Analytics track error', error);
    return NextResponse.json({ success: false, error: error?.message || 'Error' }, { status: 200 });
  }
}
