import { getDeviceContext, setUa } from '0-support/device-detect';
import store from '1-data/store';
import { DeviceContextProvider } from '3-wrapper/context/device-context';
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
  const userAgent = immutablePageProps.userAgent;
  delete immutablePageProps.userAgent;

  // Set the user agent for device detection.
  setUa(userAgent);

  return (
    <DeviceContextProvider device={getDeviceContext()}>
      <Component {...immutablePageProps} />
    </DeviceContextProvider>
  );
};

//@ts-ignore
App.getInitialProps = async function ({ Component, ctx }: AppContext) {

  const userAgent = (ctx.req && ctx.req.headers)
    ? ctx.req.headers['user-agent'] || ''
    : window.navigator.userAgent;

  const pageProps: { [key: string]: any } = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    userAgent
  };

  return { pageProps };
};

export default store.withRedux(App);
