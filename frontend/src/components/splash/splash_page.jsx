import React from 'react';
import {Link} from 'react-router-dom';

class Splash extends React.Component {

  render() {
    return (
      <div className="splash-container">
        <div className="splash-subcontainer">

          <div className="splash-header-container">
            <img alt="backpackr-logo" className="splash-header-logo" src="https://i.ibb.co/HdM0KxR/logo.png" />
                <h1 className="splash-header-text">Backpackr</h1>
          </div>

          <div className="splash-body-container">
              <img alt="splash-img" className="splash-img" src="https://i.ibb.co/WKytN1W/splash-image-3.png" />

            <div className="splash-body-text-container">
              <div className="splash-body-text-header">
                <h1 className="splash-body-text-1">Travel Planning Made Simple.</h1>
                <br />
              </div>

              <div className="splash-body-text-2">
                <h3>organize a new trip</h3>
              </div>

              <div className="splash-body-text-3">
                <Link to="/signup"><img alt="new-trip" className="arrow-img" src="https://i.ibb.co/cCtY6hd/arrow-icon.png" /></Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;