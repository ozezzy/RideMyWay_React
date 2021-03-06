import React, { Fragment } from "react";
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import isLoggedIn from '../utils/auth'
import { auth } from '../actions/auth'

import Home from './home';
import Auth from '../containers/auth/Auth';
import CreateRide from '../containers/createRide/CreateRide'
import ProtectedRoute from '../containers/ProtectedRoute'
import Logout from '../components/Logout'
import ListRide from '../containers/ListRide/ListRide'
import RideDetail from '../containers/RideDetail/RideDetail'
import Profile from '../containers/Profile/Profile'
import '../../static/styles/main.css'

class App extends React.Component {

  checkAuthentication = () => {
    if (isLoggedIn()) {
      const user = JSON.parse(localStorage.user);
      store.dispatch(auth.setLoggedIn(user));
    } else {
      store.dispatch(auth.logoutUser());
    }
  }
  render() {
    this.checkAuthentication()

    return (
      <Provider store={store} >
        <Router>
          <Fragment>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Auth} />
            <Route exact path="/register" render={props => <Auth {...props} checked={true} />} />
            <ProtectedRoute exact path="/logout" component={Logout} />
            <ProtectedRoute exact path="/user/profile" component={Profile} />
            <ProtectedRoute exact path="/ridee/ride" component={RideDetail} />
            <ProtectedRoute exact path="/rides" component={ListRide} />
            <ProtectedRoute exact path="/users/rides" component={CreateRide} />
          </Fragment>
        </Router>
      </Provider >
    )
  }
}

export default App