import { NextRequest, NextResponse } from 'next/server';
import { createQPayInvoice } from '@/lib/qpay';

export async function POST(req: NextRequest) {
  try {
    const { childName } = await req.json();
    const invoiceNo = `ANZ_${Date.now()}`;
    const amount = 9900;
    const description = `ANZAAR PRO Playbook: ${childName || 'Child'}`;

    if (!process.env.QPAY_USERNAME || !process.env.QPAY_PASSWORD) {
      return NextResponse.json({
        isMock: true,
        invoiceId: invoiceNo,
        amount,
        currency: 'MNT',
        qrImage: '',
        urls: [],
        message: 'Mock payment mode active',
      });
    }

    const qpayRes = await createQPayInvoice(invoiceNo, amount, description);
    return NextResponse.json({
      isMock: false,
      invoiceId: qpayRes.invoice_id,
      amount,
      currency: 'MNT',
      qrText: qpayRes.qr_text,
      qrImage: qpayRes.qr_image,
      urls: qpayRes.urls || [],
    });
  } catch (error: any) {
    console.error('QPay API Create Invoice Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create QPay invoice' },
      { status: 500 }
    );
  }
}
