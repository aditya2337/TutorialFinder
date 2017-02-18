import React, { Component } from 'react';

export default class Register extends Component {
  render () {
    return (
      <div>
        <form>
          <label>Email:</label>
          <input type='text' ref='username' />
          <label>Password:</label>
          <input type='password' ref='password' />
          <label>Repeat Password:</label>
          <input type='password' ref='password' />
          <button>Register</button>
        </form>
      </div>
    );
  }
}
