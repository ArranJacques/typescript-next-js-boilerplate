import 'app.styl';
import React from 'react';
import { PageContextProps } from 'support/page';
import { Provider } from 'react-redux';
import bootstrap from 'foundation/bootstrap';
import store, { deserialise, serialise } from 'data/store';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import withRedux from 'next-redux-wrapper';

class App extends NextApp {

    constructor(props: any) {
        super(props);
        bootstrap({ userAgent: props.pageProps.context.userAgent || null });
    }

    static async getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {

        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        const context: PageContextProps = {
            userAgent: ''
        };

        if (ctx.req && ctx.req.headers) {
            context.userAgent = ctx.req.headers['user-agent'] || '';
        } else {
            context.userAgent = navigator.userAgent;
        }

        return { pageProps: { ...pageProps, context } };
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
