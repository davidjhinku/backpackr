import React from 'react';

class UsersList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: ''
        }
        this.addFriend = this.addFriend.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderErrors = this.renderErrors.bind(this);
    }

    addFriend(e){
        e.preventDefault()
        let user = {
            email: this.state.email,
            tripId: this.props.tripId
        }

        this.props.addUserToTrip(user)
            .then(this.setState({email: ''}))
    }

    removeFriend(userId){
        return e => {
            e.preventDefault()
            let user ={
                userId: userId,
                tripId: this.props.tripId
            }
    
            this.props.removeUserFromTrip(user)
        }
    }

    handleChange(e) {
        this.setState({email: e.target.value})
    }

    renderErrors(errors) {
        return (
            <li>
                {errors}
            </li>
        )
    }

    tripUsers(users) {
        return users.map((user, idx) => {
            return (
                <li className="trip-users-element" key={`user-${idx}`}>
                    <p className="trip-users-text">{user.username}</p>
                    <div className='uninvite-friend'>
                        <button onClick={this.removeFriend(user._id)}>✕</button>
                    </div>
                </li>
            )
        })
    }


    render(){
        // debugger
        let users = Object.values(this.props.newusers)
        return(
            <div className="userslist-container">
                <div className="userslist-users-container">
                    <header className="userslist-header-element-1">
                        <h2>Adventurers</h2>
                    </header>
                    
                    <ul className='trip-users-list'>
                        {this.tripUsers(users)}
                    </ul>
                </div>


                <div className="userslist-invite-users-container">
                    <div/>
                        <ul className="users-list-errors">
                            {this.renderErrors(this.props.errors)}
                        </ul>
                    <div/>
                    <header className="userslist-header-element-2">
                        <h3>Invite friends</h3>
                    </header>

                    <form onSubmit={this.addFriend}>
                        <input type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder='Email'
                            className="userslist-input-element"
                        />
                        <br />
                        <button className='invite-button'>Send Invite</button>
                    </form>
                </div>
                
            </div>
        )
    }
}

export default UsersList;