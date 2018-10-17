import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
 
import store from '../src/store'
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from '../src/components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/dashboard/AddExperience'
import { clearProfile } from "./actions/profileActions";

if(localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'))
  const decoded = jwt_decode(localStorage.getItem('token'))
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser())
    store.dispatch(clearProfile())
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
