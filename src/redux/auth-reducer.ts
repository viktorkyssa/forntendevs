import {FormAction, stopSubmit} from "redux-form"

import {ResultCodeForCaptchaEnum, ResultCodesEnum} from '../api/api'
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {authAPI} from "../api/auth-api"
import {securityAPI} from "../api/security-api"

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	isFetching: false,
	captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch(action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {...state, ...action.payload}
		default:
			return state
	}
}

/* Action Creators */
export const actions = {
	setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
		type: SET_USER_DATA, payload: {userId, email, login, isAuth}
	}),
	getCaptchaUrlSuccess: (captchaUrl: string) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})
}

/* Thunks */
export const getAuthUserData = (): ThunkType => async (dispatch) => {
	let authData = await authAPI.autentificate()
	if(authData.resultCode === ResultCodesEnum.Success) {
		let {id, login, email} = authData.data
		dispatch(actions.setAuthUserData(id, email, login, true))
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
	let data = await authAPI.login(email, password, rememberMe, captcha)
	if(data.resultCode === ResultCodesEnum.Success) {
		dispatch(getAuthUserData())
	} else {
		if(data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
			dispatch(getCaptchaUrl())
		}
		let message = data.messages.length > 0 ? data.messages[0] : 'Login or email is invalid'
		dispatch(stopSubmit('login',{_error: message}))
	}
}

export const logout = (): ThunkType => async (dispatch) => {
	let data = await authAPI.logout()
	if(data.resultCode === 0) {
		dispatch(actions.setAuthUserData(null, null, null, false))
	}
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
	const data = await securityAPI.getCaptchaUrl()
	const captchaUrl = data.url
	dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer

// Types
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>