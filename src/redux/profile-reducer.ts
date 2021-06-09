import {FormAction, stopSubmit} from "redux-form"

import {PhotosType, PostType, ProfileType} from "../types/types"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {profileAPI} from '../api/profile-api'

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

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state
    }
}

/* Action Creators */
export const actions = {
    // @ts-ignore
    addPost: (newPostText: string) => ({type: ADD_POST, newPostText} as const),
    // @ts-ignore
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    // @ts-ignore
    setStatus: (status: string) => ({type: SET_STATUS, status} as const),
    // @ts-ignore
    deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
    // @ts-ignore
    savePhotoSuccess: (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)
}

/* Thunks */
export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId).then(res => res)
    //@ts-ignore
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (id: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(id)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)

        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {
        console.error(error);
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        if(userId != null) {
            dispatch(getProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer

// Types
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
