import * as app from '1-data/app/app-actions';
import { Record } from 'immutable';
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

interface Props {
  hello: string
}

const defaultValues: Props = {
  hello: ''
};

export type AppState = Record<Props>;
export const State = Record<Props>(defaultValues);

export default function appReducer(state: AppState = new State(), action: app.Action | AnyAction): AppState {

  // TypeScript gets a bit confused sometimes if the "payload" property doesn't
  // exist on one or more of the action types we define. By assigning the "action"
  // argument to a variable and explicitly defining it's type, as done below, it
  // helps TypeScript get a grip on what's going on and prevents it throwing
  // errors...

  if (action.type === HYDRATE) {
    const any = action as AnyAction;
    return any.payload.app;
  }

  const a = action as app.Action;

  switch (a.type) {
    case app.ActionType.SetHello:
      return state.set('hello', a.payload);
  }

  return state;
}
