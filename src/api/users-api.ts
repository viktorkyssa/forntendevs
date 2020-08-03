import {instance, APIResponseType} from "./api"
import {UserType} from "../types/types"

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '') {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`).then(res => res.data)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then(res => res.data)
    },
    follow: function (id: number) {
        return instance.post<APIResponseType>(`follow/${id}`).then(res => res.data) as Promise<APIResponseType>
    }
}