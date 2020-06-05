import * as app from 'data/app/app-actions';
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

export default (state: AppState = new State(), action: app.Action | AnyAction): AppState => {

    switch (action.type) {
        case HYDRATE:
            return action.payload.app;
        case app.ActionType.SetHello:
            return state.set('hello', action.payload);
    }

    return state;
}
