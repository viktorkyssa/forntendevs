import axios from 'axios'

import {ProfileType, UserType} from "../types/types"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "a961e904-1f8c-4fef-bfed-e41e73517e06"
    }
})

type GetUsersResponseType = {
	items: Array<UserType>
	totalCount: number
	error: string
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then(res => res.data)
    },
    follow(id: number) {
        return instance.post(`follow/${id}`).then(res => res.data)
    },
    getProfile(id: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(id)
    }
}

export const profileAPI = {
    getProfile(id: number) {
        return instance.get(`profile/${id}`).then(res => res.data)
    },
    getStatus(id: number) {
        return instance.get(`profile/status/${id}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status}) // status: status
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)

        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
	CaptchaIsRequired = 10
}

type AutentificateResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
	data: {
		userId: number
	}
	resultCode: ResultCodesEnum | ResultCodeForCaptcha
	messages: Array<string>
}

export const authAPI = {
    autentificate() {
        return instance.get<AutentificateResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}