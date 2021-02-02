import { connect } from 'react-redux';
import { login, receiveErrors } from '../../actions/session_actions';
import LoginForm from './login_form';

const mSTP = (state, ownProps) => {
  return {
    errors: state.errors.session
  };
};

const mDTP = dispatch => {
  return {
    login: user => dispatch(login(user)),
    clearErrors: (errors) => dispatch(receiveErrors(errors))
  };
};

export default connect(mSTP, mDTP)(LoginForm);