import * as app from 'data/app/app-actions';
import { Record } from 'immutable';

interface Props {
    hello: string
}

const defaultValues: Props = {
    hello: ''
};

export type AppState = Record<Props>;
export const State = Record<Props>(defaultValues);

export default (state: AppState = new State(), action: app.Action): AppState => {

    switch (action.type) {
        case app.ActionType.SetHello:
            return state.set('hello', action.payload);
    }

    return state;
}
