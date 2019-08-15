import { ThunkAction } from 'redux-thunk';
import State from 'data/state';
import { Action as ReduxAction } from 'redux';

export enum ActionType {
    SetHello = 'SET_HELLO'
}

interface SetHello extends ReduxAction {
    readonly type: ActionType.SetHello
    readonly payload: string
}

export type Action = SetHello

export function setHello(text: string): ThunkAction<Promise<void>, State, void, Action> {
    return dispatch => new Promise(resolve => {
        dispatch({ type: ActionType.SetHello, payload: text });
        resolve();
    });
}