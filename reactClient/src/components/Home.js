import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }

  render () {
    const { isLoggedIn } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/login' } };
    if (!isLoggedIn) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className='container'>
        <div className='center'>
          Welcome!
        </div>
      </div>
    );
  }
}

export default Home;
