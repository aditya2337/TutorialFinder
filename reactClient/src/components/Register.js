import React, { Component } from 'react';
import Authenticate from '../Authenticate';

export default class Register extends Component {
  constructor (props) {
    super(props);

    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup (e) {
    e.preventDefault();
    const { username, password, first_name, last_name } = this.refs;
    Authenticate.signup(username.value, password.value, first_name.value, last_name.value);
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSignup}>
          <div>
            <label>First Name:</label>
            <input type='text' ref='first_name' />
          </div>
          <div>
            <label>Last Name:</label>
            <input type='text' ref='last_name' />
          </div>
          <div>
            <label>Email:</label>
            <input type='text' ref='username' />
          </div>
          <div>
            <label>Password:</label>
            <input type='password' ref='password' />
          </div>
          <div>
            <label>Repeat Password:</label>
            <input type='password' ref='password2' />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
      </div>
    );
  }
}
