import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';

import Root from './components/root';
import configureStore from './store/store';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  // Check if there is a session token already stored.
  if (localStorage.jwtToken) {

    // Add token to header for all future requests.
    setAuthToken(localStorage.jwtToken);
    // Get user info by decoding the token.
    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      // If the token has expired,
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = '/login';
    }

  } else {
    // If this is a first time user, start with an empty store.
    store = configureStore({});
  }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});