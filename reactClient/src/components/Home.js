import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import Authenticate from '../Authenticate';
import { connect } from 'react-redux';
import { fetchSessionIfNeeded } from '../store/actions';

class Home extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }

  // static propTypes = {
  //   selectedSession: PropTypes.bool.isRequired,
  //   posts: PropTypes.array.isRequired,
  //   isFetching: PropTypes.bool.isRequired,
  //   lastUpdated: PropTypes.number,
  //   dispatch: PropTypes.func.isRequired
  // }

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.selectedSession !== this.props.selectedSession) {
  //     const { dispatch } = nextProps;
  //     dispatch(fetchSessionIfNeeded('androiditya@gmail.com', 'aditya337'));
  //   }
  //
  //   Authenticate.isFetching = nextProps.isFetching;
  //   Authenticate.isAuthenticated = nextProps.posts.authenticated;
  //
  //   if (!Authenticate.isAuthenticated) {
  //     this.setState({ isLoggedIn: false });
  //   }
  // }

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

const mapStateToProps = state => {
  const { selectedSession, postsBySession } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySession['undefined'] || {
    isFetching: true,
    items: []
  };

  return {
    selectedSession,
    posts,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(Home);
// export default Home;
