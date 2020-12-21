import { getDeviceContext } from '0-support/device-detect';
import { DeviceContext } from '0-support/types';
import React, { Context, createContext, FC, useContext } from 'react';

const DevContext: Context<DeviceContext> = createContext<DeviceContext>(getDeviceContext());

export const DeviceContextProvider: FC<{ device: DeviceContext }> = ({ children, device }) => {
  return (
    <DevContext.Provider value={device}>
      {children}
    </DevContext.Provider>
  );
};

export default function useDevice() {
  return useContext(DevContext);
};
