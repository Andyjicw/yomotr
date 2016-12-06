import moment from 'moment';
import Exponent from 'exponent';
import { Alert } from 'react-native';
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

  friendsList = update(friendsList, { $push: [friend] });

  firebaseRef.child('users_data').child(friend)
  .once('value', (snapshot) => {
    const exists = snapshot.val() !== null;

    if (exists) {
      // Save friends
      firebaseRef.child('users_data').child(user).child('friends')
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
    } else {
      Alert.alert(
        'Wrong username!',
        'Your friend username does not exist or it is mispelled'
    );
    }
  });
};

export const setFriendUser = user => (dispatch) => {
  dispatch({
    type: actionTypes.SET_FRIEND_USER,
    user
  });
};
