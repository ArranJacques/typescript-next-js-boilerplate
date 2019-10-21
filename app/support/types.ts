import { NextPageContext } from 'next';
import { Store } from 'redux';
import State from 'data/state';

export interface NextJSReduxPageContext extends NextPageContext {
    store: Store<State>
    isServer: boolean;
}
