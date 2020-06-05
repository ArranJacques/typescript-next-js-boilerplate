import { Record } from 'immutable';
import { UAParser } from 'ua-parser-js';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type DeviceContext = Record<{
    isDesktop: boolean
    isIE: boolean
    isIEEdge: boolean
    isMobile: boolean
    isTablet: boolean
    isTouch: boolean
    type: DeviceType
}>

export interface DeviceProps {
    device: DeviceContext
}

let UA = new UAParser();
let device = UA.getResult();

const DEVICE_TYPES = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: undefined
};

const BROWSER_TYPES = {
    EDGE: 'Edge',
    IE: 'IE'
};

export function setUa(uaStr: string): void {
    UA = UA.setUA(uaStr);
    device = UA.getResult();
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

export function isTouch(): boolean {
    return isMobile() || isTablet();
}

export function getDeviceType(): DeviceType {
    return isDesktop() ? 'desktop' : (isTablet() ? 'tablet' : 'mobile');
}

export function getDeviceContext(): DeviceContext {

    const type = isMobile() ? 'mobile' : (isTablet() ? 'tablet' : 'desktop');

    return Record({
        isDesktop: type === 'desktop',
        isIE: isIEBrowser(),
        isIEEdge: isEdgeBrowser(),
        isMobile: type === 'mobile',
        isTablet: type === 'tablet',
        isTouch: type === 'mobile' || type === 'tablet',
        type: type as DeviceType
    })();
}

export function getDeviceModifiers(device: DeviceContext): string[] {

    const modifiers: string[] = [device.get('type')];

    if (device.get('isIE')) {
        modifiers.push('d-ie');
    }

    if (device.get('isIEEdge')) {
        modifiers.push('d-ie-edge');
    }

    if (device.get('isTouch')) {
        modifiers.push('d-touch');
    }

    return modifiers;
}
