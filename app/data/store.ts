import { applyMiddleware, combineReducers, createStore } from 'redux';
import appReducer from 'data/app/app-reducer';
import State from 'data/state';
import thunk, { ThunkMiddleware } from 'redux-thunk';

export default function () {
    return createStore(
        combineReducers<State>({ app: appReducer } as any),
        applyMiddleware(thunk as ThunkMiddleware<State>)
    );
}