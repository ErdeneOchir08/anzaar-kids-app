export interface QPayTokenResponse {
  token_type: string;
  refresh_token: string;
  access_token: string;
  expires_in: number;
  scope: string;
}

export interface QPayBankUrl {
  name: string;
  description: string;
  logo: string;
  link: string;
}

export interface QPayInvoiceResponse {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
  qPay_shortUrl: string;
  urls: QPayBankUrl[];
}

export interface QPayPaymentCheckResponse {
  count: number;
  paid_amount: number;
  rows: {
    payment_id: string;
    payment_status: 'PAID' | 'NEW' | 'FAILED';
    payment_amount: number;
    payment_date: string;
  }[];
}

const QPAY_BASE_URL = process.env.QPAY_URL || 'https://merchant.qpay.mn/v2';
const QPAY_USERNAME = process.env.QPAY_USERNAME || '';
const QPAY_PASSWORD = process.env.QPAY_PASSWORD || '';
const QPAY_INVOICE_CODE = process.env.QPAY_INVOICE_CODE || '';

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getQPayAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60000) {
    return cachedToken.token;
  }

  if (!QPAY_USERNAME || !QPAY_PASSWORD) {
    throw new Error('QPAY_USERNAME and QPAY_PASSWORD must be configured in environment variables');
  }

  const authString = Buffer.from(`${QPAY_USERNAME}:${QPAY_PASSWORD}`).toString('base64');

  const res = await fetch(`${QPAY_BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${authString}`,
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`QPay auth failed (${res.status}): ${errText}`);
  }

  const data: QPayTokenResponse = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in * 1000),
  };

  return data.access_token;
}

export async function createQPayInvoice(
  senderInvoiceNo: string,
  amount: number,
  description: string
): Promise<QPayInvoiceResponse> {
  const token = await getQPayAccessToken();

  const body = {
    invoice_code: QPAY_INVOICE_CODE,
    sender_invoice_no: senderInvoiceNo,
    invoice_receiver_code: 'ANZAAR_PARENT',
    invoice_description: description,
    amount,
    callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/qpay/callback?invoice_id=${senderInvoiceNo}`,
  };

  const res = await fetch(`${QPAY_BASE_URL}/invoice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`QPay invoice creation failed (${res.status}): ${errText}`);
  }

  return await res.json();
}

export async function checkQPayPayment(invoiceId: string): Promise<boolean> {
  const token = await getQPayAccessToken();

  const res = await fetch(`${QPAY_BASE_URL}/payment/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      object_type: 'INVOICE',
      object_id: invoiceId,
      offset: {
        page_number: 1,
        page_limit: 100,
      },
    }),
  });

  if (!res.ok) {
    return false;
  }

  const data: QPayPaymentCheckResponse = await res.json();
  return data.rows && data.rows.some((row) => row.payment_status === 'PAID');
}
