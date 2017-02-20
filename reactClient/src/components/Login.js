import React, { Component } from 'react';
import Authenticate from '../Authenticate';

export default class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.login = this.login.bind(this);
  }

  login (e) {
    e.preventDefault();
    const { username, password } = this.refs;
    Authenticate.authenticate(username, password, () => {
      this.setState({ isLoggedIn: true });
    });
  }

  render () {
    const { isLoggedIn } = this.state;

    return (
      <div>
        <form onSubmit={this.login}>
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
