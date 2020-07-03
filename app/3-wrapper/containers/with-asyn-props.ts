import { NextPage } from 'next';
import getInitialProps from '0-support/get-initial-props-hoc';
import { NextJSReduxPageContext } from '0-support/types';

export default function <P extends {}, I extends {} = {}>(Component: NextPage<P, I>) {

    return getInitialProps<P, I, I>(
        'WithAsyncProps',
        Component,
        async (ctx: NextJSReduxPageContext, cmpInitialProps) => {
            // Perform actions here, dispatch redux actions to update the store, etc.
            console.log(ctx);
            return await cmpInitialProps();
        }
    );
};
