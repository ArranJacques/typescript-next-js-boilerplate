import BaseLayout from 'presentation/composed/4-layouts/BaseLayout';
import React, { PureComponent } from 'react';
import { PageProps } from 'support/page';
import { NextJSReduxPageContext } from 'support/types';

interface Props extends PageProps {
    statusCode: number | null
}

export default class extends PureComponent<Props> {

    public static async getInitialProps({ res, err }: NextJSReduxPageContext) {
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
