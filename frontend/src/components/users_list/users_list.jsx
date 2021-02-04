import React from 'react'
import { Link } from 'react-router-dom';

class UsersList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        let user = {
            email: this.state.email,
            tripId: this.props.tripId
        }
        this.props.addUserToTrip(user)
            .then(this.setState({email: ''}))
    }
    
    handleChange(e) {
        this.setState({email: e.target.value})
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
                <br/>

                <p>Invite your friends</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder='Email'
                    />
                    <br/>
                    <button>Send Invite</button>
                </form>
                <br/>
                <h2>Adventurers</h2>
                <ul>
                    {tripUsers}
                </ul>
            </div>
        )
    }
}

export default UsersList;