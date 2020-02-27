import {DialogType, MessageType} from "../types/types"

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

export type InitialStateType = typeof initialState

const messagesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
type ActionsTypes = SendMessageActionType

type SendMessageActionType = {
  type: typeof SEND_MESSAGE,
  newMessageBody: string
}

export const sendMessage = (newMessageBody: string): SendMessageActionType => ({type: SEND_MESSAGE, newMessageBody})

export default messagesReducer
