import { filter } from 'lodash';
import { Alert } from 'react-native';
import firebaseApp from '../../constants/Firebase';
import pushNotifications from '../../api/pushNotifications';
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
    const friends = filter(snapshot.val(), (val) => {
      if (val !== null) {
        return val;
      }

      return false;
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

export const sendYo = friend => (dispatch, getState) => {
  dispatch({
    type: actionTypes.SEND_YO_REQUEST,
    isSendingYo: true
  });

  const { user } = getState().auth;

  firebaseRef.child('users_data').child(friend)
  .once('value', (snapshot) => {
    const token = snapshot.val().token;

    pushNotifications.sendYo(token, user);

    dispatch({
      type: actionTypes.SEND_YO_SUCCESS,
      isSendingYo: false
    });

    Alert.alert(`YO sent to ${friend}`);
  });
};
