import { connect } from 'react-redux';
import { signup, login, receiveErrors } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mSTP = (state, ownProps) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};

const mDTP = dispatch => {
  return {
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
    clearErrors: (errors) => dispatch(receiveErrors(errors))
  }
}

export default connect(mSTP, mDTP)(SignupForm);