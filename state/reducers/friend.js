import {
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAILURE,
  SET_FRIEND_USER
} from '../actionTypes';
import { friend as friendInitialState } from '../initialState';

const friendReducer = (state = friendInitialState, action) => {
  switch (action.type) {
    case ADD_FRIEND_REQUEST:
      return {
        ...state,
        isUploaded: action.isUploaded,
        isUploading: action.isUploading
      };
    case ADD_FRIEND_SUCCESS:
      return {
        ...friendInitialState,
        isUploaded: action.isUploaded,
        isUploading: action.isUploading
      };
    case ADD_FRIEND_FAILURE:
      return {
        ...state,
        error: action.error,
        isUploaded: action.isUploaded,
        isUploading: action.isUploading
      };
    case SET_FRIEND_USER:
      return {
        ...state,
        username: action.user
      };
    default:
      return state;
  }
};

export default friendReducer;
