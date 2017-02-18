import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class header extends Component {
  render () {
    return (
      <div>
        <ul>
          <Link to='/login'><li>Login</li></Link>
          <Link to='/register'><li>Register</li></Link>
        </ul>
      </div>
    );
  }
}
