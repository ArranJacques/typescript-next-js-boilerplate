import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class extends Document {

  public render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
