import { setHello } from 'data/app/app-actions';
import { EXAMPLE_CONFIG } from 'foundation/config/runtime';
import { bemClassList } from 'frontend-utilities/index';
import BaseLayout from 'presentation/composed/4-layouts/BaseLayout';
import Cloud from 'presentation/svgs/cloud.svg';
import React, { PureComponent } from 'react';
import { getDeviceModifiers } from 'support/device-detect';
import { PageProps } from 'support/page';
import { NextJSReduxPageContext } from 'support/types';

interface Props extends PageProps {
    hello: string,
    randomiseHello: () => void
}

export default class extends PureComponent<Props> {

    timer: number | undefined;

    public static async getInitialProps({ store }: NextJSReduxPageContext) {

        const p = (): Promise<string> => new Promise(
            resolve => setTimeout(() => resolve('World'), 100)
        );

        store.dispatch(setHello(await p()) as any);

        return {};
    }

    public componentDidMount(): void {
        this.timer = window.setInterval(this.props.randomiseHello, 3000);
    }

    public componentWillUnmount(): void {
        clearTimeout(this.timer);
    }

    public render(): JSX.Element {

        const { device, hello, pageContext } = this.props;

        const cl = bemClassList('home-page').add(getDeviceModifiers(device));

        return (
            <BaseLayout className={cl.toString()} pageContext={pageContext}>
                <div className="home-page__body">
                    <Cloud />
                    <a href={EXAMPLE_CONFIG}>Hello {hello}!</a>
                </div>
            </BaseLayout>
        );
    }
}
