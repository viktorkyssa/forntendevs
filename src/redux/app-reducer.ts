import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"

import {getAuthUserData} from "./auth-reducer"

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

export type InitialStateType = {
	initialized: boolean
}

let initialState: InitialStateType = {
	initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch(action.type) {
		case INITIALIZED_SUCCESS:
			return {...state, initialized: true}
		default:
			return state
	}
}

/* Action Creators */
type ActionsTypes = InitializedSuccessActionType

type InitializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

/* Thunks */
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => (dispatch) => {
	let promise = dispatch(getAuthUserData())
	Promise.all([promise]).then(() => {
		dispatch(initializedSuccess())
	})
}

export default appReducer