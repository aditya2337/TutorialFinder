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

export default class Routes extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentWillMount () {
    Authenticate.checkSession(() => {
      this.setState({ isLoggedIn: true });
    });
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact={true} path='/' component={App} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <PrivateRoute path='/home' component={Home} logOutUser={this.handleLogout} />
        </div>
      </Router>
    );
  }
}
const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
      Authenticate.isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <p>Loading...</p>
      )
    )} />
);
