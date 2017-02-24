export const REQUEST_SESSION = 'REQUEST_SESSION';
export const RECEIVE_SESSION = 'RECEIVE_SESSION';
export const IS_LOGGEDIN = 'IS_LOGGEDIN';
export const REFRESH = 'REFRESH';

export const selectState = session => ({
  type: IS_LOGGEDIN,
  session
});

export const refreshSession = session => ({
  type: REFRESH,
  session
});

function requestSession (email) {
  return {
    type: REQUEST_SESSION,
    email
  };
}

function receiveSession (email, json) {
  return {
    type: RECEIVE_SESSION,
    email,
    posts: json,
    receivedAt: Date.now()
  };
}

const fetchSession = (username) => dispatch => {
  dispatch(requestSession(username));
  return fetch(`http://localhost:3001/users/home`, {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      dispatch(receiveSession(username, json));
      dispatch(selectState(json.authenticated));
    });
};

const shouldfetchSession = (state, session) => {
  const posts = state.postsBySession[session];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
};

export const fetchSessionIfNeeded = (username, password) => (dispatch, getState) => {
  if (shouldfetchSession(getState(), username)) {
    return dispatch(fetchSession(username, password));
  }
};
