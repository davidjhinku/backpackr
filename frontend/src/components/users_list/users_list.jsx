import React from 'react'
import { Link } from 'react-router-dom';

class UsersList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: ''
        }
        this.addFriend = this.addFriend.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

    render(){
        const tripUsers = this.props.users.map((user, idx)=>{
            return (
                <div>
                    <li className="trip-users-element" key={`user-${idx}`}>{user.username}</li>
                    <div>
                        <button onClick={this.removeFriend(user._id)}>Uninvite?</button>
                    </div>
                    <br/>
                </div>
            )
        });
        

        return(
            <div className="userslist-container">
                <div className="userslist-users-container">
                    <header className="userslist-header-element-1">
                        <h2>Adventurers</h2>
                    </header>
                    

                    <ul>
                        {tripUsers}
                    </ul>

                </div>

                <div className="userslist-invite-users-container">
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
                        <button>Send Invite</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UsersList;