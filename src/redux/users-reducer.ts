import {usersAPI} from '../api/api'
import {Dispatch} from "redux"
import {ThunkAction} from "redux-thunk"

import {updateObjectInArray} from "../utils/object-helpers"
import {UserType} from "../types/types"
import {AppStateType} from "./redux-store"

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users ids
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

/* Action Creators */
type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
    SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId})

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_COUNT, totalCount})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

/* Thunks */
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(toggleIsFetching(true))

    let data = await usersAPI.getUsers(currentPage, pageSize)

    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(setCurrentPage(currentPage))
}

// const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
//   dispatch(toggleFollowingProgress(true, userId))
//   let data = await apiMethod(userId)
//   if(data.resultCode === 0) {
//     dispatch(actionCreator(userId))
//   }
//   dispatch(toggleFollowingProgress(false, userId))
// }
//
// export const unfollow = (userId) => async (dispatch) => {
//   followUnfollowFlow(dispatch, userId, usersAPI.unfollow(userId), unfollowSuccess)
// }
//
// export const follow = (userId) => async (dispatch) => {
//   followUnfollowFlow(dispatch, userId, usersAPI.follow(userId), followSuccess)
// }

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await usersAPI.unfollow(userId)
    if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await usersAPI.follow(userId)
    if (data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export default usersReducer
