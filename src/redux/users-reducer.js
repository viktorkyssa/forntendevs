import {usersAPI} from '../api/api'
import {updateObjectInArray} from "../utils/object-helpers"

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

  switch(action.type) {
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
          : state.followingInProgress.filter(id => id != action.userId)
      }
    default:
      return state
  }
}

/* Action Creators */
export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

/* Thunks */
export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
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

export const unfollow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await usersAPI.unfollow(userId)
    if(data.resultCode === 0) {
      dispatch(unfollowSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await usersAPI.follow(userId)
    if(data.resultCode === 0) {
      dispatch(followSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export default usersReducer
