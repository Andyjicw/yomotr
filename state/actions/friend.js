import moment from 'moment';
import Exponent from 'exponent';
import { map, includes } from 'lodash';
import update from 'react-addons-update';
import pushNotifications from '../../api/pushNotifications';
import firebaseApp from '../../constants/Firebase';
import * as actionTypes from '../actionTypes';
import { friendsActions } from './';

const firebaseRef = firebaseApp.database().ref();

export const addFriend = friend => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ADD_FRIEND_REQUEST,
    isUploaded: false,
    isUploading: true
  });

  let friendsList = getState().friends.all;
  const { user } = getState().auth;
  const friendObject = friend;

  friendObject.id = `FRIEND:${moment().format()}`;
  friendObject.username = user;
  friendObject.creationDate = moment().format();
  delete friendObject.isUploading;
  delete friendObject.isUploaded;
  delete friendObject.error;

  friendsList = update(friendsList, { $push: [friendObject] });

  // Save friends
  firebaseRef.child('user_data').child(user).child('friends')
  .set(friendsList)
  .then(() => {
    // pushNotifications.photoUploadedPushNotification();

    dispatch({
      type: actionTypes.ADD_FRIEND_SUCCESS,
      isUploaded: true,
      isUploading: false
    });

    dispatch(friendsActions.fetchFriends());
  }, (err) => {
    dispatch({
      type: actionTypes.ADD_FRIEND_FAILURE,
      isUploaded: false,
      isUploading: false,
      error: err
    });
  });
};

export const setFriendUser = user => (dispatch) => {
  dispatch({
    type: actionTypes.SET_FRIEND_USER,
    user
  });
};
