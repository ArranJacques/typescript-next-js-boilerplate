import { Record } from 'immutable';
import { NextSeo } from 'next-seo';
import React, { PureComponent } from 'react';
import { PageProps } from 'support/page';

interface Props extends PageProps {
    className?: string
    seo?: Record<{
        title?: string
        description?: string
    }>
}

export default class extends PureComponent<Props> {

    protected getOpenGraphProperties(): { [key: string]: any } {

        const { pageContext, seo } = this.props;

        return {
            description: seo ? seo.get('description') : undefined,
            site_name: 'Hello World',
            title: seo ? seo.get('title') : 'Hello World',
            type: 'website',
            url: pageContext.get('url').get('canonical')
        };
    }

    public render(): JSX.Element {

        const { children, className, pageContext, seo } = this.props;

        return (
            <>
                <NextSeo
                    title={seo ? seo.get('title') : 'Hello World'}
                    canonical={pageContext.get('url').get('canonical')}
                    description={seo ? seo.get('description') : undefined}
                    openGraph={this.getOpenGraphProperties()}
                />
                <div className={`base-layout${className ? ' ' + className : ''}`}>
                    {children}
                </div>
            </>
        );
    }
}
