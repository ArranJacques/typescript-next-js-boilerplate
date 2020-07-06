import { getDeviceModifiers } from '0-support/device-detect';
import { NextJSReduxPageContext } from '0-support/types';
import useDevice from '3-wrapper/contexts/device-detect';
import BaseLayout from '4-presentation/components/4-layouts/BaseLayout';
import { bemClassList } from 'frontend-utilities';
import { NextPage } from 'next';
import React from 'react';

interface Props {
    statusCode: number | null
}

const Page: NextPage<Props> = ({ statusCode }) => {

    const device = useDevice();
    const cl = bemClassList('error-page').add(getDeviceModifiers(device));

    return (
        <BaseLayout className={cl.string()}>
            <div className="error-page__body">
                <h1>{statusCode ? statusCode : 'Unknown'}</h1>
                <h2>{statusCode === 404 ? 'Page not found' : 'An error occurred'}</h2>
            </div>
        </BaseLayout>
    );
};

Page.getInitialProps = async ({ res, err }: NextJSReduxPageContext): Promise<Props> => {

    const statusCode = !(res && res.statusCode)
        ? (err && err.statusCode) ? err.statusCode : null
        : res.statusCode;

    return { statusCode };
};

export default Page;
