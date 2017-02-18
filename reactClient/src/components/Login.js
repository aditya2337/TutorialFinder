import React, { Component } from 'react';

export default class Login extends Component {
  render () {
    return (
      <div>
        <form>
          <label>Email:</label>
          <input type='text' ref='username' />
          <label>Password:</label>
          <input type='password' ref='password' />
          <button>Log In</button>
        </form>
      </div>
    );
  }
}
