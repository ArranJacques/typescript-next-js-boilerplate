import React, { PureComponent } from 'react';
import { NextJSReduxPageContext } from 'support/types';
import { setHello } from 'data/app/app-actions';
import BaseLayout from 'presentation/components/4-layouts/base/BaseLayout';
import Cloud from 'presentation/svgs/cloud.svg';

interface Props {
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

        const { hello } = this.props;

        return (
            <BaseLayout className="pg-home">
                <div className="pg-home__body">
                    <Cloud />
                    <span>Hello {hello}!</span>
                </div>
            </BaseLayout>
        );
    }
}
