import { Alert } from 'react-native';
import { includes } from 'lodash';
import update from 'react-addons-update';
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

  if (friend.length) {
    firebaseRef.child('users_data').child(friend)
    .once('value', (snapshot) => {
      const exists = snapshot.val() !== null;
      const same = user === friend;

      if (exists && !same) {
        firebaseRef.child('users_data').child(user)
        .once('value', (snapshot) => {
          const alreadyAdded = includes(snapshot.val().friends, friend);

          if (!alreadyAdded) {
            friendsList = update(friendsList, { $push: [friend] });

            // Save friends
            firebaseRef.child('users_data').child(user).child('friends')
            .set(friendsList)
            .then(() => {
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
          } else if (alreadyAdded) {
            Alert.alert(
              'Friend already added!',
              'The friend you are trying to add is already on your friends list'
            );
          }
        });
      } else if (!exists) {
        Alert.alert(
          'Wrong username!',
          'Your friend username does not exist or it is mispelled'
        );
      } else if (same) {
        Alert.alert(
          'Wrong username!',
          'Your can not add yourself as a friend'
        );
      }
    });
  }
};

export const setFriendUser = user => (dispatch) => {
  dispatch({
    type: actionTypes.SET_FRIEND_USER,
    user
  });
};
