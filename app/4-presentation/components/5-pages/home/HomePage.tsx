import { EXAMPLE_CONFIG } from '0-foundation/config/runtime';
import { getDeviceModifiers } from '0-support/device-detect';
import { NextJSReduxPageContext } from '0-support/types';
import { setHello } from '1-data/app/app-actions';
import useDevice from '3-wrapper/contexts/device-detect';
import BaseLayout from '4-presentation/components/4-layouts/base/BaseLayout';
import Cloud from '4-presentation/svgs/cloud.svg';
import { bemClassList } from 'frontend-utilities/index';
import { NextPage } from 'next';
import React, { useEffect } from 'react';

interface Props {
    hello: string,
    randomiseHello: () => void
}

const Page: NextPage<Props> = ({ hello, randomiseHello }) => {

    let timer: number | undefined;

    const device = useDevice();

    useEffect(() => {
        timer = window.setInterval(randomiseHello, 3000);
        return () => clearTimeout(timer);
    }, []);

    const cl = bemClassList('home-page').add(getDeviceModifiers(device));

    return (
        <BaseLayout className={cl.toString()}>
            <div className="home-page__body">
                <Cloud />
                <a href={EXAMPLE_CONFIG}>Hello {hello}!</a>
            </div>
        </BaseLayout>
    );
};

Page.getInitialProps = async (ctx: NextJSReduxPageContext): Promise<Props> => {
    ctx.store.dispatch(setHello('World') as any);
    // Suppress TypeScript errors by pretending we're returning the initial props.
    return {} as Props;
};

export default Page;

