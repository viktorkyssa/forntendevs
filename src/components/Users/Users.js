import React from 'react'
import styles from './users.module.css'
import Paginator from "../common/Paginator/Paginator"
import User from "./User"

let Users = (props) => {
	return (
		<div className={styles.usersPage}>
            <Paginator currentPag={props.currentPage} totalItemsCount={props.totalUsersCount}
                       pageSize={props.pageSize} onPageChanged={props.onPageChanged} />
          <div className={styles.usersList}>
              {
                  props.users.map(user => <User key={user.id} user={user} followingInProgress={props.followingInProgress}
                                                unfollow={props.unfollow} follow={props.follow} />)
              }
          </div>
        </div>
	)
}

export default Users