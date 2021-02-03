import { connect } from 'react-redux';
import { createComment, receiveErrors } from '../../actions/chat_actions'
import Chats from './chats'

const mSTP = (state, ownProps) => {
    return {
        errors: state.errors.trip
    }
}

const mDTP = dispatch => {
    return {
        createComment: data => dispatch(createComment(data)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(Chats);