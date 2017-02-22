import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Header from './components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Authenticate from './Authenticate';
import App from './App';
import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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

let link = false;
Authenticate.checkSession(() => {
  link = true;
  console.log(link);
});

const Routes = () => (
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

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
      link ? (
        React.createElement(component, props)
      ) : (
        <p>Loading...{link}haha</p>
      )
    )} />
);

export default Routes;
