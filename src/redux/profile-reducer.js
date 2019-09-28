import {profileAPI, usersAPI} from '../api/api'
import {stopSubmit} from "redux-form"

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = '/profile/SAVE_PHOTO_SUCCESS'

let initialState = {
  posts: [
    {
      id: 1,
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, non!',
      likes: 10,
    },
    {
      id: 2,
      message: 'Illo modi, culpa cupiditate repellat eos rerum saepe hic distinctio odio dolor!',
      likes: 23,
    }
  ],
  profile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {

  switch(action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likes: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    }
    case SET_USER_PROFILE:
      return {...state, profile: action.profile}
    case SET_STATUS:
      return {...state, status: action.status}
    case DELETE_POST:
      return {...state, posts: state.posts.filter(p => p.id != action.postId)}
    case SAVE_PHOTO_SUCCESS:
      return {...state, profile: {...state.profile, photos: action.photos}}
    default:
      return state
  }
}

/* Action Creators */
export const addPost = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

/* Thunks */
export const getProfile = (userId) => async (dispatch) => {
  const data = await usersAPI.getProfile(userId)
  dispatch(setUserProfile(data))
}

export const getStatus = (id) => async (dispatch) => {
  const data = await profileAPI.getStatus(id)
  dispatch(setStatus(data))
}

export const updateStatus = (status) => async (dispatch) => {
  const res = await profileAPI.updateStatus(status)

  if(res.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export const savePhoto = (file) => async (dispatch) => {
  const res = await profileAPI.savePhoto(file)

  if(res.data.resultCode === 0) {
    dispatch(savePhotoSuccess(res.data.data.photos))
  }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const res = await profileAPI.saveProfile(profile)

  if(res.data.resultCode === 0) {
    dispatch(getProfile(userId))
  } else {
      dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0]}))
    return Promise.reject(res.data.messages[0])
  }
}

export default profileReducer
