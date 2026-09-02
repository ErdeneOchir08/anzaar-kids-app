import { NextRequest, NextResponse } from 'next/server';
import { recordAnalyticsEvent } from '@/lib/analytics';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = await recordAnalyticsEvent({
      type: body.type || 'PAGE_VIEW',
      childName: body.childName,
      ageGroup: body.ageGroup,
      archetypeId: body.archetypeId,
      archetypeTitle: body.archetypeTitle,
      invoiceId: body.invoiceId,
      amount: body.amount,
      userAgent: req.headers.get('user-agent') || undefined,
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
