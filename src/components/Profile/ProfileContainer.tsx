import React from 'react'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from '../../redux/profile-reducer'
import {AppStateType} from "../../redux/redux-store"
import {ProfileType} from "../../types/types"

import Profile from './Profile'

type MapStatePropsType = {
	authorizedUserId: number | null
	profile: ProfileType | null
	status: string
	isAuth: boolean
}

type MapDispatchPropsType = {
	updateStatus: (status: string) => void
	getProfile: (userId: number | null) => void
	getStatus: (userId: number | null) => void
	savePhoto: () => void
	saveProfile: () => void
}

type OwnPropsType = {
	match: {
		params: {
			userId: number
		}
	}
	history: {
		push: (url: string) => void
	}
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType>  {

	refreshProfile() {
		let userId: number | null = this.props.match.params.userId
		if(!userId) {
			userId = this.props.authorizedUserId
			if(!userId) {
				this.props.history.push('/login')
			}
		}

		this.props.getProfile(userId)
		this.props.getStatus(userId)
	}

	componentDidMount() {
		this.refreshProfile()
	}

	componentDidUpdate(prevProps: PropsType) {
		if(this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile()
		}
	}

	render() {
		return <Profile {...this.props}
						profile={this.props.profile}
						status={this.props.status}
						updateStatus={this.props.updateStatus}
						isOwner={!this.props.match.params.userId}
						savePhoto={this.props.savePhoto}
						saveProfile={this.props.saveProfile}/>
	}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth
})

export default compose(
	withRouter,
	connect(mapStateToProps,{getProfile, getStatus, updateStatus, savePhoto, saveProfile})
)(ProfileContainer)
