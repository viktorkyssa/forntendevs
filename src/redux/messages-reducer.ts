import {DialogType, MessageType} from "../types/types"
import {InferActionsTypes} from "./redux-store";

const SEND_MESSAGE = 'messages/SEND-MESSAGE'

let initialState = {
  dialogs: [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Jon' },
    { id: 3, name: 'Steve' }
  ] as Array<DialogType>,
  messages: [
    {id: 1, message: "Hi"},
    {id: 2, message: "How are you?"},
    {id: 3, message: "How was your day today?"},
  ] as Array<MessageType>
}

const messagesReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch(action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody
      return {
         ...state,
         messages: [...state.messages, {id: 7, message: body}]
       }
    default:
      return state
  }
}

/* Actions */

export const actions = {
  sendMessage: (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody})
}

export default messagesReducer

// Types
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
