import {ThunkAction} from "redux-thunk"

import {AppStateType, InferActionsTypes} from "./redux-store"
import {getAuthUserData} from "./auth-reducer"

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

let initialState = {
	initialized: false
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch(action.type) {
		case INITIALIZED_SUCCESS:
			return {...state, initialized: true}
		default:
			return state
	}
}

/* Action Creators */
export const actions = {
	initializedSuccess: () => ({type: INITIALIZED_SUCCESS})
}

/* Thunks */
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const initializeApp = (): ThunkType => (dispatch) => {
	let promise = dispatch(getAuthUserData())
	Promise.all([promise]).then(() => {
		dispatch(actions.initializedSuccess())
	})
}

export default appReducer

// Types
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>