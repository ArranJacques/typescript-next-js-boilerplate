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
            userAgent: '',
            url: {
                protocol: '',
                host: '',
                path: ''
            }
        };

        if (ctx.req && ctx.req.headers) {
            context.userAgent = ctx.req.headers['user-agent'] || '';
            const req: any = ctx.req;
            context.url.protocol = req.protocol;
            context.url.host = req.get('host');
            context.url.path = ctx.pathname;
            context.url.path = context.url.path || '/';
        } else {
            context.userAgent = navigator.userAgent;
            context.url.protocol = window.location.protocol;
            context.url.host = window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            context.url.path = window.location.pathname;
            context.url.path = context.url.path || '/';
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
