import {instance} from "./api"

type GetCaptchaUrlResponseDataType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseDataType>('security/get-captcha-url').then(res => res.data)
    }
}