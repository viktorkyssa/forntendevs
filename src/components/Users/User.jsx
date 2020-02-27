import React from 'react'
import styles from './users.module.css'
import userPhoto from '../../assets/img/user.png'
import {NavLink} from 'react-router-dom'

let User = ({user, followingInProgress, unfollow, follow}) => {
	return (
		  <div className={styles.user}>
			  <div className={styles.user__photo}>
				<div>
				  <NavLink to={'/profile/'+user.id}>
					<img src={user.photos.small != null ? user.photos.small : userPhoto}
						 className={styles.userPhoto} alt="Image" />
				  </NavLink>
				</div>
				<div>
				  {user.followed ? <button className={styles.user__btn} disabled={followingInProgress.some(id => id === user.id)}
										   onClick={() => {unfollow(user.id)}}>Unfollow</button> :
					  <button className={styles.user__btn} disabled={followingInProgress.some(id => id === user.id)}
							  onClick={() => {follow(user.id)}}>Follow</button> }
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