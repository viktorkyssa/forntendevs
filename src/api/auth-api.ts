import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api"

type AutentificateResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    autentificate() {
        return instance.get<APIResponseType<AutentificateResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType,ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data)
    }
}