import React from 'react'
import {connect} from 'react-redux'

import {logout} from '../../redux/auth-reducer'
import {AppStateType} from "../../redux/redux-store"

import Header from './Header'

type MapStatePropsType = {
	isAuth: boolean
	login: string | null
}

type MapDispatchPropsType = {
	logout: () => void
}

type PropsTypes = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsTypes> {
    render() {
  	  return <Header {...this.props} />
    }
}

const mapStateToPros = (state: AppStateType): MapStatePropsType => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
})

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>
	(mapStateToPros,{logout})(HeaderContainer)
