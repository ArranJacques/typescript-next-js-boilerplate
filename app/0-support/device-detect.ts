import { DeviceContext, DeviceType } from '0-support/types';
import { Record } from 'immutable';
import UAParser from 'ua-parser-js';

let UA = new UAParser();
let device = UA.getResult();
let context: DeviceContext | null = null;

const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: undefined
};

const BROWSER_TYPES = {
  EDGE: 'Edge',
  IE: 'IE',
  SAFARI: 'Safari'
};

export function setUa(uaStr: string): void {
  UA = UA.setUA(uaStr);
  device = UA.getResult();
  context = null;
}

function isiPadSafari(): boolean {

  if (typeof window === 'undefined') {
    // TODO: Fix server side
    return false;
  }

  // Workaround for iPadOS which is currently not detectable via UA.
  return window.orientation !== undefined && device.os.name === 'Mac OS';
}

export function isMobile(): boolean {
  return device.device.type === DEVICE_TYPES.MOBILE;
}

export function isTablet(): boolean {
  if (isiPadSafari()) {
    return true;
  }
  return device.device.type === DEVICE_TYPES.TABLET;
}

export function isDesktop(): boolean {
  if (isiPadSafari()) {
    return false;
  }
  return device.device.type === DEVICE_TYPES.DESKTOP;
}

export function isIEBrowser(): boolean {
  return device.browser.name === BROWSER_TYPES.IE;
}

export function isEdgeBrowser(): boolean {
  return device.browser.name === BROWSER_TYPES.EDGE;
}

export function isSafariBrowser(): boolean {
  return device.browser.name === BROWSER_TYPES.SAFARI;
}

export function isTouch(): boolean {
  return isMobile() || isTablet();
}

export function getDeviceType(): DeviceType {
  return isMobile() ? 'mobile' : (isTablet() ? 'tablet' : 'desktop');
}

export function getDeviceVersion(): string | undefined {
  return device.browser.version;
}

export function getDeviceContext(): DeviceContext {

  if (context) {
    return context;
  }

  context = Record({
    isDesktop: isDesktop(),
    isIE: isIEBrowser(),
    isIEEdge: isEdgeBrowser(),
    isMobile: isMobile(),
    isSafari: isSafariBrowser(),
    isTablet: isTablet(),
    isTouch: isTouch(),
    type: getDeviceType(),
    version: getDeviceVersion()
  })();

  return context;
}

export function getDeviceModifiers(device: DeviceContext): string[] {

  const modifiers: string[] = [device.get('type')];

  if (device.get('isIE')) {
    modifiers.push('ie');
  }

  if (device.get('isIEEdge')) {
    modifiers.push('ie-edge');
  }

  if (device.get('isSafari')) {
    modifiers.push('safari');
  }

  if (device.get('isTouch')) {
    modifiers.push('touch');
  } else {
    modifiers.push('non-touch');
  }

  return modifiers;
}
