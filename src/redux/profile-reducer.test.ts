import profileReducer, {actions} from "./profile-reducer"

let state = {
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
  profile: null,
  status: ''
}

it('length of posts should be incremented', () => {
  // 1. Test data
  let action = actions.addPost('Test Post')
  // 2. Action
  let newState = profileReducer(state,action)
  // 3. Expectation
  expect(newState.posts.length).toBe(3)
})

it('after deleting length of messages should be decrement', () => {
  let action = actions.deletePost(1)
  let newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(1)
})
