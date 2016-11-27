import { AsyncStorage, Alert } from 'react-native';
import pushNotifications from '../../api/pushNotifications';
import * as actionTypes from '../actionTypes';

export const isLoggedIn = () => (dispatch) => {
  dispatch({
    type: actionTypes.CHECK_LOGIN_REQUEST,
    isLoading: true
  });

  AsyncStorage.getItem('session')
  .then((response) => {
    const session = JSON.parse(response);

    if (session) {
      pushNotifications.registerForPushNotifications();

      dispatch({
        type: actionTypes.CHECK_LOGIN_SUCCESS,
        loggedIn: true,
        isLoading: false,
        user: session.user,
        facebookToken: session.facebookToken
      });
    } else {
      dispatch({
        type: actionTypes.CHECK_LOGIN_FAILURE,
        loggedIn: false,
        isLoading: false
      });
    }
  });
};

export const logout = () => (dispatch) => {
  const doLogout = () => {
    dispatch({
      type: actionTypes.LOGOUT_REQUEST,
      isLoading: true
    });

    AsyncStorage.removeItem('session')
    .then(() => {
      Alert.alert('See you next time!', null);

      dispatch({
        type: actionTypes.LOGOUT_SUCCESS
      });
    }, (err) => {
      dispatch({
        type: actionTypes.LOGOUT_FAILURE,
        error: err,
        isLoading: false
      });
    });
  };

  Alert.alert(
    'Log out on Rmotrgram?',
    null,
    [
      { text: 'Cancel', onPress: () => {} },
      { text: 'Log out', onPress: doLogout }
    ]
  );
};
