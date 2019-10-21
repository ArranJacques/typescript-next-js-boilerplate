import 'app.styl';
import React from 'react';
import { NextPageContext } from 'next';
import store, { deserialise, serialise } from 'data/store';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import NextApp from 'next/app';

class App extends NextApp {

    public static async getInitialProps({ Component, ctx }: { Component: any, ctx: NextPageContext }) {
        return {
            pageProps: Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}
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

export default withRedux(store, {
    serializeState: state => serialise(state),
    deserializeState: state => state ? deserialise(state) : state
})(App);
