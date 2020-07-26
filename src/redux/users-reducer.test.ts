import usersReducer, {InitialStateType, actions, follow, unfollow} from "./users-reducer"
import {usersAPI} from "../api/users-api"
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock('../api/users-api')

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

// @ts-ignore
usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Viktor0',
                followed: false,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status0'
            },
            {
                id: 1,
                name: 'Viktor1',
                followed: false,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status1'
            },
            {
                id: 2,
                name: 'Viktor2',
                followed: true,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status2'
            },
            {
                id: 3,
                name: 'Viktor3',
                followed: true,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status3'
            }
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }

    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
})

test('Follow Success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test('Unfollow Success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});

/* Thunks Test */
test('Follow Thunk Success', async () => {
    const thunk = follow(1)
    // @ts-ignore
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
});

test('Unfollow Thunk Success', async () => {
    const thunk = unfollow(1)
    // @ts-ignore
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
});