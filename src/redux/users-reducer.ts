import {updateObjectInArray} from "../utils/object-helpers"
import {UserType} from "../types/types"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {usersAPI} from '../api/users-api'

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_FILTER = 'users/SET_FILTER'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

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
        case SET_FILTER:
            return {
                ...state,
                // @ts-ignore
                filter: action.payload
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
export const actions = {
    // @ts-ignore
    followSuccess: (userId: number) => ({type: FOLLOW, userId} as const),
    // @ts-ignore
    unfollowSuccess: (userId: number) => ({type: UNFOLLOW, userId} as const),
    // @ts-ignore
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
    // @ts-ignore
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    // @ts-ignore
    setFilter: (filter: FilterType) => ({type: SET_FILTER, payload: {filter}} as const),
    // @ts-ignore
    setTotalUsersCount: (totalCount: number) => ({type: SET_TOTAL_COUNT, totalCount} as const),
    // @ts-ignore
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
        // @ts-ignore
    } as const)
}

/* Thunks */
export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setFilter(filter))

    let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
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
    dispatch(actions.toggleFollowingProgress(true, userId))
    let data = await usersAPI.unfollow(userId)
    if (data.resultCode === 0) {
        dispatch(actions.unfollowSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let data = await usersAPI.follow(userId)
    if (data.resultCode === 0) {
        dispatch(actions.followSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export default usersReducer

// Types
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
