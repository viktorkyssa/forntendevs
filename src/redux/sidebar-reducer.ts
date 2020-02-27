type FriendType = {
  id: number
  name: string
  img: string
}

let initialState = {
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
  ] as Array<FriendType>
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
  return state
}

export default sidebarReducer
