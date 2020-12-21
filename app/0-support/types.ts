import State from '1-data/state';
import { Record } from 'immutable';
import { NextPageContext } from 'next';
import { Store } from 'redux';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type DeviceContext = Record<{
  isDesktop: boolean
  isIE: boolean
  isIEEdge: boolean
  isMobile: boolean
  isSafari: boolean
  isTablet: boolean
  isTouch: boolean
  type: DeviceType,
  version?: string
}>

export interface NextJSReduxPageContext extends NextPageContext {
  store: Store<State>
}
