const SEND_MESSAGE = 'messages/SEND-MESSAGE'

let initialState = {
  dialogs: [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Jon' },
    { id: 3, name: 'Steve' }
  ],
  messages: [
    {id: 1, message: "Hi"},
    {id: 2, message: "How are you?"},
    {id: 3, message: "How was your day today?"},
  ]
}

const messagesReducer = (state = initialState, action) => {
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

export const sendMessage = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default messagesReducer
