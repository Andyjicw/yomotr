import { AsyncStorage, Alert } from 'react-native';
import pushNotifications from '../../api/pushNotifications';
import firebaseApp from '../../constants/Firebase';
import * as actionTypes from '../actionTypes';

const firebaseRef = firebaseApp.database().ref();
const firebaseAuth = firebaseApp.auth();

export const isLoggedIn = () => (dispatch) => {
  dispatch({
    type: actionTypes.CHECK_LOGIN_REQUEST,
    isLoading: true
  });

  AsyncStorage.getItem('session')
  .then((response) => {
    const session = JSON.parse(response);

    if (session) {
      dispatch({
        type: actionTypes.CHECK_LOGIN_SUCCESS,
        loggedIn: true,
        isLoading: false,
        user: session.user
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
    'Log out on YOmotr?',
    null,
    [
      { text: 'Cancel', onPress: () => {} },
      { text: 'Log out', onPress: doLogout }
    ]
  );
};

export const login = (username, password) => (dispatch) => {
  const email = `${username}@yomtr.com`;

  dispatch({
    type: actionTypes.LOGIN_REQUEST,
    isLoading: true
  });

  firebaseAuth.signInWithEmailAndPassword(email, password)
  .then((response) => {
    const session = {
      user: username
    };

    // Save session
    AsyncStorage.setItem('session', JSON.stringify(session))
    .then(() => {
      // check push token
      pushNotifications.getPushNotificationsToken()
      .then((token) => {
        if (token !== 'denied') {
          // update push token if necessary
          firebaseRef.child('user_data').child(session.user)
          .child('token').set(token);
        }
      });

      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        loggedIn: true,
        isLoading: false,
        user: username,
        error: '',
        errorType: ''
      });
    }, (err) => {
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        error: err,
        errorType: 'login',
        loggedIn: false,
        isLoading: false
      });

      Alert.alert(
        'Error!',
        err,
        [{ text: 'OK', onPress: () => {} }],
      );
    });
  })
  .catch((err) => {
    dispatch({
      type: actionTypes.LOGIN_FAILURE,
      error: err.message,
      errorType: 'login',
      loggedIn: false,
      isLoading: false
    });
  });
};

export const signup = (username, password) => (dispatch) => {
  const email = `${username}@yomtr.com`;

  dispatch({
    type: actionTypes.SIGNUP_REQUEST,
    isLoading: true
  });

  firebaseAuth.createUserWithEmailAndPassword(email, password)
  .then((response) => {
    const session = {
      user: username
    };

      // Save session
    AsyncStorage.setItem('session', JSON.stringify(session))
      .then(() => {
        pushNotifications.getPushNotificationsToken();

        dispatch({
          type: actionTypes.SIGNUP_SUCCESS,
          loggedIn: true,
          isLoading: false,
          user: username,
          error: '',
          errorType: ''
        });
      }, (err) => {
        dispatch({
          type: actionTypes.SIGNUP_FAILURE,
          error: err,
          errorType: 'signup',
          loggedIn: false,
          isLoading: false
        });

        Alert.alert(
          'Error!',
          err,
          [{ text: 'OK', onPress: () => {} }],
        );
      });
  })
  .catch((err) => {
    dispatch({
      type: actionTypes.SIGNUP_FAILURE,
      error: err.message,
      errorType: 'signup',
      loggedIn: false,
      isLoading: false
    });
  });
};
