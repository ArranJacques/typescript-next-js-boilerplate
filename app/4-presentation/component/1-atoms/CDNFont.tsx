import Head from 'next/head';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';

export type Props = {
  href: string;
  preConnect?: string
};

const CDNFont: FC<Props> = ({ href, preConnect }) => {

  const [rendered, rerender] = useState(false);

  useEffect(() => {
    if (!rendered) {
      rerender(true);
    }
  }, []);

  return (
    <Head>
      {!!preConnect && <link rel="preconnect" href={preConnect} crossOrigin="anonymous" />}
      <link rel="preload" as="style" href={href} />
      <link rel="stylesheet" href={href} media={!rendered ? 'print' : 'all'} />
    </Head>
  );
};

export default CDNFont;
