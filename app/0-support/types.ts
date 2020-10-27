import State from '1-data/state';
import { NextPageContext } from 'next';
import { Store } from 'redux';

export interface NextJSReduxPageContext extends NextPageContext {
  store: Store<State>
}
