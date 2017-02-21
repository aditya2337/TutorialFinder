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
        <h3>Or Login or sign up with twitter</h3>
        <ul>
          <a href='http://localhost:3001/users/auth/twitter'><li>Log In/Sign Up</li></a>
        </ul>
      </div>
    );
  }
}
