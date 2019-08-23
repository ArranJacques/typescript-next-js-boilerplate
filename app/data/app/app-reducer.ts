import * as app from 'data/app/app-actions';
import { Record } from 'immutable';

export interface AppState {
    hello: string
}

const initialState: AppState = {
    hello: 'World'
};

const StateFactory = Record<AppState>(initialState);

class State extends StateFactory implements AppState {
    constructor(config: Partial<AppState>) {
        super(config);
    }
}

export default (state: State = new State({}), action: app.Action): AppState => {

    switch (action.type) {
        case app.ActionType.SetHello:
            return state.set('hello', action.payload);
    }

    return state;
}