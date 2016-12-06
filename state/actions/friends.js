import { map } from 'lodash';
import firebaseApp from '../../constants/Firebase';
import * as actionTypes from '../actionTypes';

const firebaseRef = firebaseApp.database().ref();

export const fetchFriends = () => (dispatch, getState) => {
  const { user } = getState().auth;

  dispatch({
    type: actionTypes.FETCH_FRIENDS_REQUEST,
    isFetching: true
  });

  firebaseRef.child('users_data').child(user).child('friends')
  .once('value', (snapshot) => {
    const friends = [];

    map(snapshot.val(), (val) => {
      friends.push(val);
    });

    dispatch({
      type: actionTypes.FETCH_FRIENDS_SUCCESS,
      friends,
      isFetching: false
    });
  }, (err) => {
    dispatch({
      type: actionTypes.FETCH_FRIENDS_FAILURE,
      isFetching: false,
      error: err
    });
  });
};
//
// export const likePhoto = photoID => (dispatch) => {
//   dispatch({
//     type: actionTypes.LIKE_PHOTO,
//     photoID
//   });
// };
//
// export const unlikePhoto = photoID => (dispatch) => {
//   dispatch({
//     type: actionTypes.UNLIKE_PHOTO,
//     photoID
//   });
// };
