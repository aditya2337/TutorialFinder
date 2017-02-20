import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Authenticate from './Authenticate';

var checkAuth = Object.create(Authenticate);
setTimeout(() => {
  console.log(checkAuth.isAuthenticated);
}, 3000);

export default class Routes extends Component {

  componentWillMount () {
    checkAuth.checkSession();
    console.log(checkAuth.isAuthenticated);
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact={true} path='/' component={App} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <PrivateRoute path='/home' component={Home} />
        </div>
      </Router>
    );
  }
}
const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
      checkAuth.isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    )} />
);
