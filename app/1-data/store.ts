import app, { State as AppState } from '1-data/app/app-reducer';
import State from '1-data/state';
import { fromJS } from 'immutable';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

const reducers = { app };

function newState(initial: { [key: string]: any }): State {
  return {
    app: new AppState(fromJS(initial.app || {}))
  };
}

function serialise(state: State): any {
  const s: { [key: string]: any } = {};
  const keys: (keyof State)[] = Object.keys(state) as (keyof State)[];
  keys.forEach((key) => {
    s[key] = (state[key] as any).toJS();
  });
  return s;
}

function deserialise(state: { [key: string]: any }): any {
  return newState(state);
}

const makeStore: MakeStore<State> = ({}: Context) => createStore(
  combineReducers<State>(reducers as any),
  {},
  applyMiddleware(thunk as ThunkMiddleware<State>)
);

export default createWrapper<State>(makeStore, {
  debug: false,
  serializeState: state => serialise(state),
  deserializeState: state => state ? deserialise(state) : state
});
