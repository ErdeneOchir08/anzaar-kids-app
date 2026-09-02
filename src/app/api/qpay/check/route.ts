import { NextRequest, NextResponse } from 'next/server';
import { checkQPayPayment } from '@/lib/qpay';

export async function POST(req: NextRequest) {
  try {
    const { invoiceId, isMock } = await req.json();

    if (isMock || !process.env.QPAY_USERNAME) {
      // In mock mode, immediately confirm payment
      return NextResponse.json({
        isPaid: true,
        invoiceId,
        verifiedAt: new Date().toISOString(),
      });
    }

    const isPaid = await checkQPayPayment(invoiceId);
    return NextResponse.json({
      isPaid,
      invoiceId,
    });
  } catch (error: any) {
    console.error('QPay Check Payment Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
