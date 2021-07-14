import {FormAction} from "redux-form"

import {ResultCodesEnum} from '../api/api'
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {authAPI} from "../api/auth-api"
import { chatAPI, ChatMessageType } from "../api/chat-api"
import { Dispatch } from "redux";

const MESSAGES_RECIEVED = 'chat/MESSAGES_RECIEVED'

let initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case MESSAGES_RECIEVED:
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            }
        default:
            return state
    }
}

export const actions = {
    messagesRecieved: (messages: ChatMessageType[]) => ({
        type: MESSAGES_RECIEVED, messages
    })
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesRecieved(messages))
        }
    }

    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer

// Types
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>