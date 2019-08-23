import React, { Component } from 'react';
import BaseLayout from 'presentation/components/4-layouts/base/BaseLayout';

interface Props {
    hello: string,
    randomiseHello: () => void
}

export default class extends Component<Props> {

    timer: number | undefined;

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
                Hello {hello}!
            </BaseLayout>
        );
    }
}