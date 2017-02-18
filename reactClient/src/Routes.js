import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import App from './App';
import Login from './components/Login';
import Register from './components/Register';

export default class Routes extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact={true} path='/' component={App} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
    );
  }
}
