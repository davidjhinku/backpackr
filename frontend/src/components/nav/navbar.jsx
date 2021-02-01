import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.chooseLinks = this.chooseLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout()
    }

    chooseLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <Link to={'/profile'}>My Trips</Link>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h3>Backpackr Navbar-Logo Eventually</h3>
                {this.chooseLinks()}
            </div>
        );
    }

}

export default NavBar;