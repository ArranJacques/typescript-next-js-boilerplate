import { NextPageContext } from 'next';
import { Store } from 'redux';
import State from '1-data/state';

export interface NextJSReduxPageContext extends NextPageContext {
    store: Store<State>
    isServer: boolean;
}
