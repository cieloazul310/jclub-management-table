/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as React from 'react';
import Box from '@mui/material/Box';
import { useLocation } from '@reach/router';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdInArticle() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <Box py={2} px={1} overflow="hidden" key={pathname}>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="9174058264"
        />
      ) : null}
    </Box>
  );
}

export function AdInFooter() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <Box py={2} px={1} overflow="hidden" key={pathname}>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="3332658358"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </Box>
  );
}

export function AdInListFooter() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);

  return (
    <Box py={2} px={1} overflow="hidden" key={pathname}>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="6963353890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </Box>
  );
}
