import {authAPI, securityAPI} from '../api/api'
import {stopSubmit} from "redux-form"

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

export type InitialStateType2 = {
	userId: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean,
	isFetching: boolean,
	captchaUrl: string | null
}

let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	isFetching: false,
	captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
	switch(action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {...state, ...action.payload}
		default:
			return state
	}
}

type SetAuthUserDataActionPayloadType = {
	userId: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean
}

type SetAuthUserDataActionType = {
	type: typeof SET_USER_DATA,
	payload: SetAuthUserDataActionPayloadType
}

/* Action Creators */
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
	type: SET_USER_DATA, payload: {userId, email, login, isAuth}
})

type GetCaptchaUrlSuccessActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS,
	payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

/* Thunks */
export const getAuthUserData = () => async (dispatch: any) => {
	let res = await authAPI.autentificate()
	if(res.data.resultCode === 0) {
		let {id, login, email} = res.data.data
		dispatch(setAuthUserData(id, email, login, true))
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
	let data = await authAPI.login(email, password, rememberMe, captcha)
	if(data.resultCode === 0) {
		dispatch(getAuthUserData())
	} else {
		if(data.resultCode === 10) {
			dispatch(getCaptchaUrl())
		}
		let message = data.messages.length > 0 ? data.messages[0] : 'Login or email is invalid'
		dispatch(stopSubmit('login',{_error: message}))
	}
}

export const logout = () => async (dispatch: any) => {
	let data = await authAPI.logout()
	if(data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false))
	}
}

export const getCaptchaUrl = () => async (dispatch: any) => {
	const res = await securityAPI.getCaptchaUrl()
	const captchaUrl = res.data.url
	dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer