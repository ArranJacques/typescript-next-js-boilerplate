import * as app from '1-data/app/app-actions';
import State from '1-data/state';
import { randomHello } from '2-domain/random-hello';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

interface StateProps {
  hello: string
}

interface DispatchProps {
  randomiseHello: () => Promise<string>
}

export interface WithHelloProps extends StateProps, DispatchProps {
  //
}

const mapStateToProps = (state: State): StateProps => ({
  hello: state.app.get('hello')
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, app.Action>): DispatchProps => ({
  randomiseHello: async () => {
    const hello = randomHello();
    await dispatch(app.setHello(hello));
    return hello;
  }
});

export default connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps);
