import React, { Component } from 'react';

export default class Register extends Component {
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
            <label>Repeat Password:</label>
            <input type='password' ref='password' />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
      </div>
    );
  }
}
