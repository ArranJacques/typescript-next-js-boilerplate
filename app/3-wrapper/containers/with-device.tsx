import React, { ComponentType } from 'react';
import { DeviceProps, getDeviceContext } from '0-support/device-detect';
import { Subtract } from 'utility-types';

export default <P extends DeviceProps>(Component: ComponentType<P>) => {

    return class extends React.Component<Subtract<P, DeviceProps>> {

        public render(): JSX.Element {
            return <Component {...this.props as P} device={getDeviceContext()} />;
        }
    };
};
