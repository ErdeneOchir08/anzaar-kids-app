import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const data = await getAnalyticsData();
    const payments = data.events.filter((e) => e.type === 'PAYMENT_SUCCESS');

    // Generate CSV Content
    let csv = 'Огноо,Хүүхдийн нэр,Насны ангилал,Хэв шинж,Нэхэмжлэх ID,Дүн,Төлөв\n';
    payments.forEach((p) => {
      const date = new Date(p.timestamp).toLocaleString('mn-MN');
      const child = p.childName || 'Хүүхэд';
      const age = p.ageGroup || '';
      const arch = p.archetypeTitle || '';
      const invoice = p.invoiceId || '';
      const amount = p.amount || 14900;
      csv += `"${date}","${child}","${age}","${arch}","${invoice}",${amount},"ТӨЛӨГДСӨН"\n`;
    });

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="ANZAAR_Orders_${Date.now()}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
