export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

export const selectReddit = reddit => ({
  type: SELECT_REDDIT,
  reddit
});

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
});

function requestPosts (email) {
  return {
    type: REQUEST_POSTS,
    email
  };
}

function receivePosts (email, json) {
  return {
    type: RECEIVE_POSTS,
    email,
    posts: json,
    receivedAt: Date.now()
  };
}

const fetchPosts = (username) => dispatch => {
  dispatch(requestPosts(username));
  return fetch(`http://localhost:3001/users/home`, {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      dispatch(receivePosts(username, json));
      dispatch(selectReddit(json.authenticated));
    });
};

const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
};

export const fetchPostsIfNeeded = (username, password) => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), username)) {
    return dispatch(fetchPosts(username, password));
  }
};
