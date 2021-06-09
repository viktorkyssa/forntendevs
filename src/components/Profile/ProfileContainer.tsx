import React from 'react'
import {compose} from 'redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from '../../redux/profile-reducer'
import {AppStateType} from "../../redux/redux-store"
import {ProfileType} from "../../types/types"

import Profile from './Profile'

class ProfileContainer extends React.Component<PropsType>  {

	refreshProfile() {
		let userId: number | null = +this.props.match.params.userId
		if(!userId) {
			userId = this.props.authorizedUserId
			// @ts-ignore
			this.props.getProfile(userId)
			if(!userId) {
				// todo: maybe replace push with Redirect??
				this.props.history.push('/login')
			}
		} else {
			this.props.getProfile(userId)
			this.props.getStatus(userId)
		}
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

let mapStateToProps = (state: AppStateType) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth
})

export default compose(
	withRouter,
	connect(mapStateToProps,{getProfile, getStatus, updateStatus, savePhoto, saveProfile})
)(ProfileContainer) as React.ComponentType

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
	updateStatus: (status: string) => void
	getProfile: (userId: number) => void
	getStatus: (userId: number) => void
	savePhoto: (file: File) => void
	saveProfile: (formData: ProfileType) => Promise<any>
}

type PathParamsType = {
	userId: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>
