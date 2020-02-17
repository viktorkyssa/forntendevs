import {profileAPI, usersAPI} from '../api/api'
import {stopSubmit} from "redux-form"

import {PhotosType, PostType, ProfileType} from "../types/types"

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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
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
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state
    }
}

/* Action Creators */
type addPostActionType = {
  type: typeof ADD_POST,
  newPostText: string
}
export const addPost = (newPostText: string): addPostActionType => ({type: ADD_POST, newPostText})

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

/* Thunks */
export const getProfile = (userId: number) => async (dispatch: any) => {
    const data = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getStatus = (id: number) => async (dispatch: any) => {
    const data = await profileAPI.getStatus(id)
    dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        const res = await profileAPI.updateStatus(status)

        if (res.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {

    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const res = await profileAPI.savePhoto(file)

    if (res.data.resultCode === 0) {
        dispatch(savePhotoSuccess(res.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const res = await profileAPI.saveProfile(profile)

    if (res.data.resultCode === 0) {
        dispatch(getProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0]}))
        return Promise.reject(res.data.messages[0])
    }
}

export default profileReducer
