import { getDeviceContext, getDeviceModifiers } from '0-support/device-detect';
import { bemClassList } from 'frontend-utilities/index';

export default function bcl(className: string) {
  return bemClassList(className).add(getDeviceModifiers(getDeviceContext()));
}
