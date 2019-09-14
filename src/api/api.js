import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
      "API-KEY": "a961e904-1f8c-4fef-bfed-e41e73517e06"
    }
})

export const usersAPI = {
	getUsers (currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
	},
	unfollow (id) {
		return instance.delete(`follow/${id}`).then(res => res.data)		
	},
	follow (id) {
		return instance.post(`follow/${id}`).then(res => res.data)		
	},
	getProfile (id) {
		console.warn('Obsolete method. Please use profileAPI object.')
		return profileAPI.getProfile(id)
	}
}

export const profileAPI = {
	getProfile (id) {
		return instance.get(`profile/${id}`).then(res => res.data)
	},
	getStatus(id) {
		return instance.get(`profile/status/${id}`).then(res => res.data)
	},
	updateStatus(status) {
		return instance.put(`profile/status`, {status}) // status: status
	}
}

export const authAPI = {
	autentificate () {
		return instance.get(`auth/me`)
	},
	login(email, password, rememberMe = false) {
		return instance.post(`auth/login`,{email, password, rememberMe}).then(res => res.data)
	},
	logout() {
		return instance.delete(`auth/login`).then(res => res.data)
	}
}
