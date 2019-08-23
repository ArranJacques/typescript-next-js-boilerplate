import * as app from 'data/app/app-actions';
import { connect } from 'react-redux';
import { randomHello } from 'domain/random-hello';
import { ThunkDispatch } from 'redux-thunk';
import State from 'data/state';

interface StateProps {
    hello: string
}

interface DispatchProps {
    randomiseHello: () => void
}

const mapStateToProps = (state: State): StateProps => ({
    hello: state.app.hello
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, app.Action>): DispatchProps => ({
    randomiseHello: () => {
        dispatch(app.setHello(randomHello()));
    }
});

export default connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps);