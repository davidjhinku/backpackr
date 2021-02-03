import React from 'react'
import { Link } from 'react-router-dom';

class UsersList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: ''
        }
        this.inviteFriend = this.inviteFriend.bind(this)
    }

    inviteFriend(e){
        e.preventDefault()

    }

    render(){
        const tripUsers = this.props.users.map((user, idx)=>{
            return (
                <div>
                    <li className="trip-users-element" key={`user-${idx}`}>{user.username}</li> <Link to="">Edit</Link>
                </div>
            )
        });
        

        return(
            <div>
                <h2>Adventurers</h2>
                <br/>

                <p>Invite you friends</p>
                <form onSubmit={this.inviteFriend}>
                    <input type="text"
                        value={this.state.email}
                        placeholder=''
                    />
                    <button>Send Invite</button>
                </form>
                <br/>
                
                <ul>
                    {tripUsers}
                </ul>
            </div>
        )
    }
}

export default UsersList;