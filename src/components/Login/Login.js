import React from 'react'
import {Field, reduxForm} from "redux-form"
import {Input} from "../common/FormsControls/FormsControls"
import {required} from "../../utils/validators/validators"
import {connect} from "react-redux"
import {login} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
import styles from "./Login.module.css"
import form_styles from './../common/FormsControls/FormControls.module.css'

const LoginForm = ({handleSubmit, error}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.login_field}>
				<Field placeholder={"Email"} name={"email"}
					   component={Input} validate={[required]} />
			</div>
			<div className={styles.login_field}>
				<Field type={"password"} placeholder={"Password"} name={"password"}
					   component={Input} valida te={[required]} />
			</div>
			<label className={styles.agreement}>
				<Field type="checkbox" name={"rememberMe"} component={Input} /> remember me
			</label>
			{error && <div className={form_styles.formSummaryError}>
				{error}
			</div>}
			<div>
				<button className={"btn " + styles.btn_login}>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
	const onSubmit = ({email, password, rememberMe}) => {
		props.login(email, password, rememberMe)
	}

	if(props.isAuth) return <Redirect to={"/profile"} />

	return (
		<div className={styles.wrapper}>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	)
}

const mapStateToProps = (state) => ({isAuth: state.auth.isAuth})

export default connect(mapStateToProps,{login})(Login)