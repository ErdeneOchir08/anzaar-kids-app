'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '../../lib/tracker';

export const PageTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views on route change
    if (pathname && !pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
      trackEvent('PAGE_VIEW');
    }
  }, [pathname]);

  return null;
};
