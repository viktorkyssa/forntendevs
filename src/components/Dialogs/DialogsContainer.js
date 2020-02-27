import React from 'react'
import Dialogs from './Dialogs'
import {sendMessage}  from '../../redux/messages-reducer'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'

let mapStateToProps = ({messagesPage}) => ({messagesPage})

export default compose(
	withAuthRedirect,
	connect(mapStateToProps,{sendMessage})
)(Dialogs)
