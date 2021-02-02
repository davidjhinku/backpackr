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
                <div className="auth-navbar-container">
                    <Link className="my-trips" to={'/profile'}>MY TRIPS</Link>

                    <button className="logout-btn" onClick={this.logoutUser}>LOGOUT</button>
                </div>
            );
        } else {
            return (
                <div className="splash-navbar-container">
                    <div className="splash-navbar-about">
                        ABOUT
                    </div>
                    <div className="splash-session-options-container">
                        <div>
                            <Link to={'/signup'}>SIGNUP</Link>
                        </div>
                        <div>
                            <Link to={'/login'}>LOGIN</Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.chooseLinks()}
            </div>
        );
    }

}

export default NavBar;