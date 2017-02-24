import { combineReducers } from 'redux';
import {
  IS_LOGGEDIN, REFRESH,
  REQUEST_SESSION, RECEIVE_SESSION
} from './actions';

const selectedSession = (state = false, action) => {
  switch (action.type) {
    case IS_LOGGEDIN:
      return action.session;
    default:
      return state;
  }
};

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case REFRESH:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_SESSION:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_SESSION:
      console.log('received');
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
};

const postsBySession = (state = { }, action) => {
  console.log(action);
  switch (action.type) {
    case REFRESH:
    case RECEIVE_SESSION:
    case REQUEST_SESSION:
      return {
        ...state,
        [action.session]: posts(state[action.session], action)
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  postsBySession,
  selectedSession
});

export default rootReducer;
