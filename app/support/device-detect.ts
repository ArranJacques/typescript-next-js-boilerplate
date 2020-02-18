import { UAParser } from 'ua-parser-js';

let UA = new UAParser();

export function setUa(uaStr: string) {
    UA = UA.setUA(uaStr);
}

const DEVICE_TYPES = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    SMART_TV: 'smarttv',
    CONSOLE: 'console',
    WEARABLE: 'wearable',
    BROWSER: undefined
};

const BROWSER_TYPES = {
    CHROME: 'Chrome',
    FIREFOX: 'Firefox',
    OPERA: 'Opera',
    YANDEX: 'Yandex',
    SAFARI: 'Safari',
    INTERNET_EXPLORER: 'Internet Explorer',
    EDGE: 'Edge',
    CHROMIUM: 'Chromium',
    IE: 'IE',
    MOBILE_SAFARI: 'Mobile Safari'
};

export const isMobile = () => UA.getDevice().type === DEVICE_TYPES.MOBILE;
export const isTablet = () => UA.getDevice().type === DEVICE_TYPES.TABLET;
export const isIEBrowser = () => UA.getBrowser().name === BROWSER_TYPES.IE;
export const isEdgeBrowser = () => UA.getBrowser().name === BROWSER_TYPES.EDGE;
