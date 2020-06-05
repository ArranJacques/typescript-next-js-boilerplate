import 'app.styl';
import store from 'data/store';
import bootstrap from 'foundation/bootstrap';
import { fromJS, Record } from 'immutable';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import React from 'react';
import { PageContextProps } from 'support/page';

class App extends NextApp<AppInitialProps> {

    constructor(props: any) {

        super(props);

        const pageContext = props.pageProps.pageContext;
        const userAgent = typeof pageContext.toJS === 'function'
            ? pageContext.get('userAgent')
            : pageContext.userAgent;

        bootstrap({ userAgent: userAgent || null });
    }

    static async getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {

        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        let pageContext: PageContextProps = Record({
            userAgent: '',
            url: Record({
                canonical: '',
                protocol: '',
                host: '',
                path: ''
            })()
        })();

        if (ctx.req && ctx.req.headers) {

            // If we're server side then use the request object to build the page context.
            const req: any = ctx.req;
            let path = req.originalUrl;
            const queryIndex = path.indexOf('?');
            if (queryIndex !== -1) {
                path = path.substring(0, queryIndex);
            }
            pageContext = pageContext
                .set('userAgent', ctx.req.headers['user-agent'] || '')
                .setIn(['url', 'protocol'], req.protocol)
                .setIn(['url', 'host'], req.get('host'))
                .setIn(['url', 'path'], path || '/');
        } else {

            // If we're client side then use the window object to build the page context.
            const path = window.location.pathname;
            const host = window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            pageContext = pageContext
                .setIn(['url', 'protocol'], window.location.protocol)
                .setIn(['url', 'host'], host)
                .setIn(['url', 'path'], path || '/');
        }

        const url = pageContext.get('url');
        const canonical = (url.get('protocol') + '://' + url.get('host') + url.get('path')).replace(/\/$/, '');
        pageContext = pageContext.setIn(['url', 'canonical'], canonical);

        return { pageProps: { ...pageProps, pageContext } };
    }

    public render(): JSX.Element {

        const { Component, pageProps } = this.props;

        // pageProps are transferred over the network from server to client as a plain
        // objects meaning when we try to use them as Immutable objects client side, on
        // the first page load, things break. Before rendering the page we should check
        // if the page props are Immutable objects and if they're not then make them so.
        const serialisedPageProps: { [key: string]: any } = {};
        Object.keys(pageProps).forEach(k => {
            serialisedPageProps[k] = typeof pageProps[k].toJS !== 'function'
                ? fromJS(pageProps[k])
                : pageProps[k];
        });

        return <Component {...serialisedPageProps} />;
    }
}

export default store.withRedux(App);
