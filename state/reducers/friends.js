import {
  FETCH_FRIENDS_REQUEST,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_FAILURE
  // LIKE_PHOTO,
  // UNLIKE_PHOTO
} from '../actionTypes';
import { friends as friendsInitialState } from '../initialState';

let newFriendsList;

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
    // case LIKE_PHOTO:
    //   newPhotosList = state.all;
    //
    //   newPhotosList.map((photo) => {
    //     if (photo.id === action.photoID) {
    //       // FIXME: shouln't reassing param
    //       photo.isLiked = true;
    //     }
    //
    //     return photo;
    //   });
    //
    //   return {
    //     ...state,
    //     all: newPhotosList
    //   };
    // case UNLIKE_PHOTO:
    //   newPhotosList = state.all;
    //
    //   newPhotosList.map((photo) => {
    //     if (photo.id === action.photoID) {
    //       // FIXME: shouln't reassing param
    //       photo.isLiked = false;
    //     }
    //
    //     return photo;
    //   });
    //
    //   return {
    //     ...state,
    //     all: newPhotosList
    //   };
    default:
      return state;
  }
};

export default friendsReducer;
