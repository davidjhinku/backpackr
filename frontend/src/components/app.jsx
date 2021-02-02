import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container'
import Footer from './nav/footer'
import Splash from './splash/splash_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import TripPageContainer from './trip/trip_page_container';
import TripCreateContainer from './trip/create_trip_container';
import ItineraryCreateContainer from './itinerary_item/create_itinerary_container';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <ProtectedRoute exact path="/trips/create" component={TripCreateContainer} />
      <ProtectedRoute exact path="/trips/:tripId" component={TripPageContainer} />
      <ProtectedRoute exact path="/items/create" component={ItineraryCreateContainer} />
      <ProtectedRoute />
    </Switch>
    <Footer />
  </div>
);

export default App;