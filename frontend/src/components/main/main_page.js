import React from 'react';

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Backpackr</h1>
        <h2><a href="/signup">Sign up</a></h2>
        <a href="/login">Login</a>
      </div>
    );
  }
}

export default MainPage;