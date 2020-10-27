import bootstrap from '0-foundation/bootstrap';
import { getPageContext } from '0-support/page';
import store from '1-data/store';
import { PageContextProvider } from '3-wrapper/contexts/page-context';
import 'app.styl';
import { fromJS } from 'immutable';
import { AppContext, AppProps } from 'next/app';
import React, { FC } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }) => {

  // pageProps are transferred over the network from server to client as a plain
  // objects meaning when we try to use them as Immutable objects client side, on
  // the first page load, things break. Before rendering the page we should check
  // if the page props are Immutable objects and if they're not then make them so.
  const immutablePageProps: { [key: string]: any } = {};
  Object.keys(pageProps).forEach(k => {
    if (pageProps[k] !== null && typeof pageProps[k] === 'object') {
      immutablePageProps[k] = typeof pageProps[k].toJS !== 'function'
        ? fromJS(pageProps[k])
        : pageProps[k];
    } else {
      immutablePageProps[k] = pageProps[k];
    }
  });

  // Bootstrap the application.
  bootstrap({ userAgent: immutablePageProps.pageContext.get('userAgent') });

  const pageContext = immutablePageProps.pageContext;
  delete immutablePageProps.pageContext;

  return (
    <PageContextProvider pageContext={pageContext}>
      <Component {...immutablePageProps} />
    </PageContextProvider>
  );
};

// TODO: Add proper type.
//@ts-ignore
App.getInitialProps = async function ({ Component, ctx }: AppContext) {

  const pageProps: { [key: string]: any } = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    pageContext: getPageContext(ctx)
  };

  return { pageProps };
};

export default store.withRedux(App);
