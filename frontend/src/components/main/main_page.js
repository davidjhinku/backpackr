import React from 'react';
import { Link } from 'react-router-dom';

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Backpackr</h1>
        <Link to={'/signup'}>Signup</Link>
        <Link to={'/login'}>Login</Link>
      </div>
    );
  }
}

export default MainPage;