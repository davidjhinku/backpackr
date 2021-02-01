import NavBar from './navbar';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const mSTP = (state, ownProps) => {
    return {
        loggedIn: state.session.isAuthenticated
    }
}

const mDTP = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mSTP, mDTP)(NavBar);