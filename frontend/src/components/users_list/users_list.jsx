import React from 'react'
import { Link } from 'react-router-dom';

class UsersList extends React.Component{

    //{`{/trips/{tripId}/edit}`} edit page

    render(){
        const tripUsers = Object.values(this.props.trip.users).map((user, idx)=>{
            return (
                <ul>
                    <li className="trip-users-element" key={`user-${idx}`}>{user.handle}</li> <Link to="">Edit</Link>
                </ul>
            )
        });
        

        return(
            <div>
                {tripUsers}
            </div>
        )
    }
}

export default UsersList;