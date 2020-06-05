import { NextPage } from 'next';
import React, { Component as ReactComponent } from 'react';
import { getDisplayName } from 'support/helpers';
import { NextJSReduxPageContext } from 'support/types';

export default function <P extends {}, PI extends {} = {}, FI extends {} = {}>(
    name: string,
    Component: NextPage<P, PI>,
    fn: (
        ctx: NextJSReduxPageContext,
        cmpInitialProps: () => Promise<PI>
    ) => Promise<FI>
) {

    return class extends ReactComponent<P> {

        public static readonly displayName = `${name}(${getDisplayName(Component)})`;

        static async getInitialProps(ctx: NextJSReduxPageContext): Promise<FI> {
            return await fn(ctx, async () => {
                if (typeof Component.getInitialProps === 'function') {
                    return Component.getInitialProps(ctx);
                }
                return {} as PI;
            });
        }

        public render(): JSX.Element {
            return <Component {...this.props as P} />;
        }
    };
};
