import State from '1-data/state';
import { Action as ReduxAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export enum ActionType {
  SetHello = 'SET_HELLO'
}

interface SetHello extends ReduxAction {
  readonly type: ActionType.SetHello
  readonly payload: string
}

export type Action = SetHello

export function setHello(text: string): ThunkAction<Promise<void>, State, void, Action> {
  return async dispatch => {
    await dispatch({ type: ActionType.SetHello, payload: text });
  };
}
