import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'

import {UserType} from "../../types/types"

import userPhoto from '../../assets/img/user.png'

import styles from './users.module.css'

type PropsType = {
	user: UserType
	unfollow: (id: number) => void
	follow: (id: number) => void
	followingInProgress: Array<number>
}

let User: FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
	return (
		  <div className={styles.user}>
			  <div className={styles.user__photo}>
				<div>
				  <NavLink to={'/profile/'+user.id}>
					<img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} alt="User Avatar" />
				  </NavLink>
				</div>
				<div>
				  {user.followed ? (
					  <button className={styles.user__btn} disabled={followingInProgress.some(id => id === user.id)}
							  onClick={() => {unfollow(user.id)}}>
						  Unfollow
					  </button>
				  ) : (
					  <button className={styles.user__btn} disabled={followingInProgress.some(id => id === user.id)}
							  onClick={() => {follow(user.id)}}>
						  Follow
					  </button>
				  )}
				</div>
		  	</div>
		 	 <div className={styles.user__info}>
				<div>
				  <p className={styles.user__name}>{user.name}</p>
				  <p className={styles.user__status}>{user.status}</p>
				</div>
				<span>
				  <div>{"user.location.city"}</div>
				  <div>{"user.location.country"}</div>
				</span>
		 	 </div>
		  </div>
	)
}

export default User