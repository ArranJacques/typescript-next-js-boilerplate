import { DeviceContext, getDeviceContext } from '0-support/device-detect';
import { Context, createContext, useContext } from 'react';

let context: Context<DeviceContext> | null = null;

export default function useDevice() {

  if (!context) {
    context = createContext<DeviceContext>(getDeviceContext());
  }

  return useContext(context);
};
