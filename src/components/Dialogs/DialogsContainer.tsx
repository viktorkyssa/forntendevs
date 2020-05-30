import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'

import {InitialStateType, actions} from '../../redux/messages-reducer'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {AppStateType} from "../../redux/redux-store"

import Dialogs from './Dialogs'

type MapStatePropsType = {
	messagesPage: InitialStateType
}

type MapDispatchPropsType = {
	sendMessage: (newMessageBody: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({messagesPage: state.messagesPage})

export default compose(
	withAuthRedirect,
	connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>
	(mapStateToProps,{sendMessage: actions.sendMessage})
)(Dialogs) as React.ComponentType
