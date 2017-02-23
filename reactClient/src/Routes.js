import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded } from './store/actions';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Header from './components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Authenticate from './Authenticate';
import App from './App';
import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 50
  }
});

class Routes extends Component {
  static propTypes = {
    selectedReddit: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { dispatch, selectedReddit } = this.props;
    dispatch(fetchPostsIfNeeded('androiditya@gmail.com', 'aditya337'));
    console.log(selectedReddit);
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps);
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch } = nextProps;
      dispatch(fetchPostsIfNeeded('androiditya@gmail.com', 'aditya337'));
    }

    Authenticate.isFetching = nextProps.isFetching;
    Authenticate.isAuthenticated = nextProps.posts.authenticated;
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <div>
            <Header />
            <Route exact={true} path='/' component={App} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/home' component={Home} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
      !Authenticate.isAuthenticated
          ? (Authenticate.isFetching ? (
              <div className='container'>
                <CircularProgress size={80} thickness={5} />
              </div>
            ) : <Redirect to='/login' />)
          : React.createElement(component, props)
    )} />
);

const mapStateToProps = state => {
  const { selectedReddit, postsByReddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit['undefined'] || {
    isFetching: true,
    items: []
  };

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(Routes);
