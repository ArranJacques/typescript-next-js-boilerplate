import { applyMiddleware, combineReducers, createStore } from 'redux';
import { fromJS } from 'immutable';
import app, { State as AppState } from 'data/app/app-reducer';
import State from 'data/state';
import thunk, { ThunkMiddleware } from 'redux-thunk';

const reducers = { app };

function newState(initial: { [key: string]: any }): State {
    return {
        app: new AppState(fromJS(initial.app || {}))
    };
}

export function serialise(state: State): any {
    const s: { [key: string]: any } = {};
    const keys: (keyof State)[] = Object.keys(state) as (keyof State)[];
    keys.forEach((key) => {
        s[key] = (state[key] as any).toJS();
    });
    return s;
}

export function deserialise(state: { [key: string]: any }): any {
    return newState(state);
}

export default function (initialState: State = newState({})) {
    return createStore(
        combineReducers<State>(reducers as any),
        initialState,
        applyMiddleware(thunk as ThunkMiddleware<State>)
    );
}
