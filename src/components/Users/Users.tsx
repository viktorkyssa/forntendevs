import React, {FC} from 'react'

import {UserType} from "../../types/types"

import Paginator from "../common/Paginator/Paginator"
import User from "./User"

import styles from './users.module.css'

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    unfollow: (id: number) => void
    follow: (id: number) => void
    followingInProgress: Array<number>
}

let Users: FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged,
                                users, unfollow, follow, followingInProgress}) => {
	return (
		<div className={styles.usersPage}>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                       pageSize={pageSize} onPageChanged={onPageChanged} />
          <div className={styles.usersList}>
              {
                  users.map(user => <User key={user.id} user={user} followingInProgress={followingInProgress}
                                                unfollow={unfollow} follow={follow} />)
              }
          </div>
        </div>
	)
}

export default Users