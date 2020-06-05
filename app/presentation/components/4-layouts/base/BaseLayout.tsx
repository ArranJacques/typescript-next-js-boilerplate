import Head from 'next/head';
import React, { PureComponent } from 'react';
import { PageProps } from 'support/page';

interface Props extends PageProps {
    className?: string
}

export default class extends PureComponent<Props> {

    public render(): JSX.Element {

        const { children, className } = this.props;

        return (
            <>
                <Head>
                    <title>Hello World</title>
                </Head>
                <div className={`lyt-base${className ? ' ' + className : ''}`}>
                    {children}
                </div>
            </>
        );
    }
}
