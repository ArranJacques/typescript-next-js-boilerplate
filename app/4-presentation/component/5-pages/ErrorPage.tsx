import bcl from '0-support/helper/bem-class-list';
import { NextJSReduxPageContext } from '0-support/types';
import SEO from '4-presentation/component/1-atoms/SEO';
import BaseLayout from '4-presentation/component/4-layouts/BaseLayout';
import { NextPage } from 'next';
import React from 'react';

interface Props {
  statusCode: number | null
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => {

  const title = statusCode === 404 ? 'Page Not Found' : 'An Error Occurred';

  return (
    <>
      <SEO title={title} />
      <BaseLayout className={bcl('error-page').string()}>
        <h1>{statusCode ? statusCode : 'Unknown'}</h1>
        <h2>{statusCode === 404 ? 'Page not found' : 'An error occurred'}</h2>
      </BaseLayout>
    </>
  );
};

ErrorPage.getInitialProps = async ({ res, err }: NextJSReduxPageContext): Promise<Props> => {

  const statusCode = !(res && res.statusCode)
    ? (err && err.statusCode) ? err.statusCode : null
    : res.statusCode;

  return { statusCode };
};

export default ErrorPage;
