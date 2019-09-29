import {getAuthUserData} from "./auth-reducer"

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

let initialState = {
	initialized: false,
	globalReducer: null
}

const appReducer = (state = initialState, action) => {
	switch(action.type) {
		case INITIALIZED_SUCCESS:
			return {...state, initialized: true}
		default:
			return state
	}
}

/* Action Creators */
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

/* Thunks */
export const initializeApp = () => (dispatch) => {
	let promise = dispatch(getAuthUserData())
	Promise.all([promise]).then(() => {
		dispatch(initializedSuccess())
	})
}

export default appReducer