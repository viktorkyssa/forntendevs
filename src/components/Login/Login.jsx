import React from 'react'
import {Field, reduxForm} from "redux-form"
import {Redirect} from "react-router-dom"

import {Input} from "../common/FormsControls/FormsControls"
import {required} from "../../utils/validators/validators"
import {connect} from "react-redux"
import {login} from "../../redux/auth-reducer"

import form_styles from './../common/FormsControls/FormControls.module.css'
import styles from "./Login.module.css"

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
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

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
	const onSubmit = ({email, password, rememberMe, captcha}) => {
		props.login(email, password, rememberMe, captcha)
	}

	if(props.isAuth) return <Redirect to={"/profile"} />

	return (
		<div className={styles.wrapper}>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
		</div>
	)
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps,{login})(Login)