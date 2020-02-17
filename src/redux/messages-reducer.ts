const SEND_MESSAGE = 'messages/SEND-MESSAGE'

type dialogType = {
  id: number
  name: string
}

type messageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Jon' },
    { id: 3, name: 'Steve' }
  ] as Array<dialogType>,
  messages: [
    {id: 1, message: "Hi"},
    {id: 2, message: "How are you?"},
    {id: 3, message: "How was your day today?"},
  ] as Array<messageType>
}

export type InitialStateType = typeof initialState

const messagesReducer = (state = initialState, action: any): InitialStateType => {
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

type SendMessageActionType = {
  type: typeof SEND_MESSAGE,
  newMessageBody: string
}

export const sendMessage = (newMessageBody: string): SendMessageActionType => ({type: SEND_MESSAGE, newMessageBody})

export default messagesReducer
