import { NextPage } from 'next';
import React from 'react';
import { DeviceProps, getDeviceContext } from 'support/device-detect';
import { NextJSReduxPageContext } from 'support/types';
import { Subtract } from 'utility-types';

export default <P extends DeviceProps, I extends {} = {}>(Component: NextPage<P, I>) => {

    return class extends React.Component<Subtract<P, DeviceProps>> {

        static async getInitialProps(ctx: NextJSReduxPageContext): Promise<I> {
            if (typeof Component.getInitialProps === 'function') {
                return Component.getInitialProps(ctx);
            }
            return {} as I;
        }

        public render(): JSX.Element {
            return <Component {...this.props as P} device={getDeviceContext()} />;
        }
    };
};
