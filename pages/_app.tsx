import React from 'react';
import { Provider } from 'react-redux';
import { NextPageContext } from 'next';
import NextApp from 'next/app';
import store from 'data/store';
import withRedux from 'next-redux-wrapper';
import 'app.styl';

class App extends NextApp {

    static async getInitialProps({ Component, ctx }: { Component: any, ctx: NextPageContext }) {
        return {
            pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
        };
    }

    public render(): JSX.Element {

        const { Component, pageProps, store } = this.props as any;

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default withRedux(store)(App);
