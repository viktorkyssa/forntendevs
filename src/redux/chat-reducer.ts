import { FormAction } from "redux-form"
import { Dispatch } from "redux"

import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chat-api"
import { strict } from "assert";

const MESSAGES_RECIEVED = 'chat/MESSAGES_RECIEVED'
const STATUS_CHANGED = 'chat/STATUS_CHANGED'

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECIEVED:
            return {
                ...state,
                // @ts-ignore
                messages: [...state.messages, ...action.messages.map(m => ({ ...m, id: Math.random() }))]
                    .filter((m, idx, arr) => idx >= arr.length - 100)
            }
        case STATUS_CHANGED:
            return {
                ...state,
                // @ts-ignore
                status: action.status
            }
        default:
            return state
    }
}

export const actions = {
    messagesRecieved: (messages: ChatMessageAPIType[]) => ({
        type: MESSAGES_RECIEVED, messages
    }),
    statusChanged: (status: StatusType) => ({
        type: STATUS_CHANGED, status
    })
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = status => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageAPIType[]) => {
            dispatch(actions.messagesRecieved(messages))
        }
    }

    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-recieved', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-recieved', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
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
export type ChatMessageType = ChatMessageAPIType & { id: string }
