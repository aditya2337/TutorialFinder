import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './store/reducers';
import Routes from './Routes';
import { Provider } from 'react-redux';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

// store.dispatch(fetchPosts(store.getState(), 'androiditya@gmail.com', 'aditya337')).then(() => {
//   loggedIn = store.getState();
//   console.log(store.getState());
//   console.log(loggedIn.selectedReddit);
// });

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
