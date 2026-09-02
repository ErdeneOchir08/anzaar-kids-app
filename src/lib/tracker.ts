'use client';

export function trackEvent(
  type: 'PAGE_VIEW' | 'QUIZ_START' | 'QUIZ_COMPLETE' | 'PAYMENT_INIT' | 'PAYMENT_SUCCESS',
  data?: {
    childName?: string;
    ageGroup?: string;
    archetypeId?: string;
    archetypeTitle?: string;
    invoiceId?: string;
    amount?: number;
  }
) {
  if (typeof window === 'undefined') return;

  try {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        ...data,
      }),
      keepalive: true,
    }).catch(() => {
      // Non-blocking tracking
    });
  } catch (e) {
    // Ignore client tracking errors
  }
}
