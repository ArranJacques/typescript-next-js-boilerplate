import React, { Component } from 'react';
import './home.styl'

interface Props {
    hello: string,
    randomiseHello: () => void
}

export default class extends Component<Props> {

    public componentDidMount(): void {
        setInterval(this.props.randomiseHello, 3000);
    }

    public render(): JSX.Element {

        const { hello } = this.props;

        return (
            <div className="home">
                Hello {hello}!
            </div>
        );
    }
}