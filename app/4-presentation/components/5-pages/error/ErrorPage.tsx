import { bemClassList } from 'frontend-utilities';
import { NextPageContext } from 'next/dist/next-server/lib/utils';
import BaseLayout from '4-presentation/composed/4-layouts/BaseLayout';
import React, { PureComponent } from 'react';
import { DeviceProps, getDeviceModifiers } from '0-support/device-detect';
import { PageProps } from '0-support/page';

interface InitialProps {
    statusCode: number | null
}

interface Props extends DeviceProps, InitialProps, PageProps {
    //
}

export default class extends PureComponent<Props> {

    static async getInitialProps({ res, err }: NextPageContext): Promise<InitialProps> {

        const statusCode = !(res && res.statusCode)
            ? (err && err.statusCode) ? err.statusCode : null
            : res.statusCode;

        return { statusCode };
    }

    public render(): JSX.Element {

        const { device, pageContext, statusCode } = this.props;
        const cl = bemClassList('error-page').add(getDeviceModifiers(device));

        return (
            <BaseLayout className={cl.string()} pageContext={pageContext}>
                <div className="error-page__body">
                    <h1>{statusCode ? statusCode : 'Unknown'}</h1>
                    <h2>{statusCode === 404 ? 'Page not found' : 'An error occurred'}</h2>
                </div>
            </BaseLayout>
        );
    }
}