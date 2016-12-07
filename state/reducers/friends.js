import {
  FETCH_FRIENDS_REQUEST, FETCH_FRIENDS_SUCCESS, FETCH_FRIENDS_FAILURE,
  SEND_YO_REQUEST, SEND_YO_SUCCESS
} from '../actionTypes';
import { friends as friendsInitialState } from '../initialState';

const friendsReducer = (state = friendsInitialState, action) => {
  switch (action.type) {
    case FETCH_FRIENDS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        all: action.friends,
        isFetching: action.isFetching
      };
    case FETCH_FRIENDS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: action.isFetching
      };
    case SEND_YO_REQUEST:
    case SEND_YO_SUCCESS:
      return {
        ...state,
        isSendingYo: action.isSendingYo
      };
    default:
      return state;
  }
};

export default friendsReducer;
