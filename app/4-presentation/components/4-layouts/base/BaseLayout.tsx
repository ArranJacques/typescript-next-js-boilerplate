import { getDeviceModifiers } from '0-support/device-detect';
import useDevice from '3-wrapper/contexts/device-detect';
import usePage from '3-wrapper/contexts/page-context';
import { bemClassList } from 'frontend-utilities/index';
import { Record } from 'immutable';
import { NextSeo } from 'next-seo';
import React, { FC, memo, PropsWithChildren } from 'react';

interface Props {
    className?: string
    seo?: Record<{
        title?: string
        description?: string
    }>
}

const Layout: FC<Props> = ({ children, className, seo }) => {

    const device  = useDevice();
    const page  = usePage();
    const cl = bemClassList('base-layout').add(getDeviceModifiers(device));

    return (
        <>
            <NextSeo
                title={seo ? seo.get('title') : 'Hello World'}
                canonical={page.get('url').get('canonical')}
                description={seo ? seo.get('description') : undefined}
                openGraph={{
                    description: seo ? seo.get('description') : undefined,
                    site_name: 'Hello World',
                    title: seo ? seo.get('title') : 'Hello World',
                    type: 'website',
                    url: page.get('url').get('canonical')
                }}
            />
            <div className={`${cl.toString()}${className ? ' ' + className : ''}`}>
                {children}
            </div>
        </>
    );
};

export default memo<PropsWithChildren<Props>>(Layout);
