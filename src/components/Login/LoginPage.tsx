import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Redirect} from "react-router-dom"

import {Input} from "../common/FormsControls/FormsControls"
import {required} from "../../utils/validators/validators"
import {useDispatch, useSelector} from "react-redux"
import {login} from "../../redux/auth-reducer"
import {AppStateType} from "../../redux/redux-store"

import form_styles from './../common/FormsControls/FormControls.module.css'
import styles from "./Login.module.css"

type LoginFormOwnProps = {
	captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.login_field}>
				<Field placeholder={"Email"} name={"email"} component={Input} validate={[required]} />
			</div>
			<div className={styles.login_field}>
				<Field type={"password"} placeholder={"Password"} name={"password"} component={Input} validate={[required]} />
			</div>
			<label className={styles.agreement}>
				<Field type="checkbox" name={"rememberMe"} component={Input} /> remember me
			</label>
			{error && <div className={form_styles.formSummaryError}>{error}</div>}
			{captchaUrl && <img src={captchaUrl} alt="Captcha"/>}
			{captchaUrl && <Field type='text' placeholder='Symbols from image' name='captcha' component={Input} validate={[required]} />}
			<div>
				<button className={"btn " + styles.btn_login}>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}

type LoginFormValuesTypeKeys = keyof LoginFormValuesType

type PropsType = {

}

export const LoginPage: React.FC<PropsType> = props => {
	const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
	const dispatch = useDispatch()

	const onSubmit = ({email, password, rememberMe, captcha}: LoginFormValuesType) => {
		dispatch(login(email, password, rememberMe, captcha))
	}

	if(isAuth) return <Redirect to={"/profile"} />

	return (
		<div className={styles.wrapper}>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
		</div>
	)
}
