import React, { Component } from 'react';
import Authenticate from '../Authenticate';
import { Redirect } from 'react-router-dom';

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
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    if (isLoggedIn) {
      return (
        <Redirect to={from} />
      );
    }

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
