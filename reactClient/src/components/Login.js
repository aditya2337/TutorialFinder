import React, { Component } from 'react';

export default class Login extends Component {
  render () {
    return (
      <div>
        <form>
          <div>
            <label>Email:</label>
            <input type='text' ref='username' />
          </div>
          <div>
            <label>Password:</label>
            <input type='password' ref='password' />
          </div>
          <div>
            <button>Log In</button>
          </div>
        </form>
      </div>
    );
  }
}
