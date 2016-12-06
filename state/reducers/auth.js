import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  CHECK_LOGIN_REQUEST, CHECK_LOGIN_SUCCESS, CHECK_LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../actionTypes';
import { auth as authInitialState } from '../initialState';

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case CHECK_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case CHECK_LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading,
        user: action.user
      };
    case CHECK_LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading,
        user: action.user,
        error: action.error,
        errorType: action.errorType
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        errorType: action.errorType,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading,
        user: action.user,
        error: action.error,
        errorType: action.errorType
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.error,
        errorType: action.errorType,
        loggedIn: action.loggedIn,
        isLoading: action.isLoading
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case LOGOUT_SUCCESS:
      return {
        ...authInitialState
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};

export default authReducer;
