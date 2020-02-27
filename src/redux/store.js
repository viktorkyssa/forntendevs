import profileReducer from './profile-reducer'
import messagesReducer from './messages-reducer'
import sidebarReducer from './sidebar-reducer'

let store = {
  _state: {
    profilePage: {
      posts: [
        {
          id: 1,
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, non!',
          likes: 10,
        },
        {
          id: 2,
          message: 'Illo modi, culpa cupiditate repellat eos rerum saepe hic distinctio odio dolor!',
          likes: 23,
        }
      ],
      newPostText: '',
    },
    messagesPage: {
      dialogs: [
        {
          id: 1,
          name: 'Alex'
        },
        {
          id: 2,
          name: 'Jon'
        },
        {
          id: 3,
          name: 'Steve'
        }
      ],
      messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "How was your day today?"},
      ],
      newMessageBody: ""
    },
    sidebar: {
      friends: [
        {
          id: 1,
          name: 'Harry',
          img: 'http://dreamatico.com/data_images/people/people-2.jpg'
        },
        {
          id: 2,
          name: 'Stefani',
          img: 'https://pixel.nymag.com/imgs/fashion/daily/2018/08/17/magazine/tessa-thompson-1.w570.h712.jpg'
        },
        {
          id: 3,
          name: 'Donald',
          img: 'https://images.axios.com/078ps5QcbNgqsgEI_QkV9hDW9PQ=/0x0:3900x2194/1920x1080/2018/08/25/1535212462538.jpg'
        },
      ]
    }
  },
  _callSubscriber() {
    console.log('State was changed!')
  },
  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.messagesPage = messagesReducer(this._state.messagesPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    this._callSubscriber(this._state)
  }
}

export default store
window.store = store
