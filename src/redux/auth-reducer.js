import {authAPI} from '../api/api'
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'auth/SET_USER_DATA'

let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	isFetching: false
}

const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_USER_DATA:
			return {...state, ...action.payload}
		default:
			return state
	}
}

/* Action Creators */
export const setAuthUserData = (userId, email, login, isAuth) => ({
	type: SET_USER_DATA, payload: {userId, email, login, isAuth
}})

/* Thunks */
export const getAuthUserData = () => async (dispatch) => {
	let res = await authAPI.autentificate()
	if(res.data.resultCode === 0) {
		let {id, login, email} = res.data.data
		dispatch(setAuthUserData(id, email, login, true))
	}
}

export const login = (email, password, rememberMe) => async (dispatch) => {
	let data = await authAPI.login(email, password, rememberMe)
	if(data.resultCode === 0) {
		dispatch(getAuthUserData())
	} else {
		let message = data.messages.length > 0 ? data.messages[0] : 'Login or email is invalid'
		dispatch(stopSubmit('login',{_error: message}))
	}
}

export const logout = () => async (dispatch) => {
	let data = await authAPI.logout()
	if(data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false))
	}
}

export default authReducer