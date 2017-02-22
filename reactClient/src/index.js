import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './store/reducers';
import { fetchPostsIfNeeded } from './store/actions';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

store.dispatch(fetchPostsIfNeeded('reactjs')).then(() =>
  console.log(store.getState())
);

ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('root')
);
