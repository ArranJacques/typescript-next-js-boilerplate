import React, { PureComponent } from 'react';
import BaseLayout from 'presentation/components/4-layouts/base/BaseLayout';
import { NextJSReduxPageContext } from 'support/types';

interface Props {
    statusCode: number | null
}

export default class extends PureComponent<Props> {

    public static getInitialProps({ res, err }: NextJSReduxPageContext) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode };
    }

    public render(): JSX.Element {

        const { statusCode } = this.props;

        return (
            <BaseLayout className="pg-error">
                {!statusCode ? (
                    <h1>An error occurred</h1>
                ) : (
                    <>
                        <h1>{statusCode}</h1>
                        <h2>{statusCode === 404 ? 'Page not found' : 'An error occurred on server'}</h2>
                    </>
                )}
            </BaseLayout>
        );
    }
}
