import React, {FC, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"

import {FilterType, requestUsers, follow, unfollow} from "../../redux/users-reducer"
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors"

import Paginator from "../common/Paginator/Paginator"
import User from "./User"
import UsersSearchForm from "./UsersSearchForm"

import styles from './users.module.css'

type PropsType = {

}

export const Users: FC<PropsType> = props => {
	const totalUsersCount = useSelector(getTotalUsersCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

	const onPageChanged = (pageNumber: number) => {
	    dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (id: number) => {
        dispatch(follow(id))
    }

    const unfollow = (id: number) => {
        dispatch(unfollow(id))
    }

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    return (
		<div className={styles.usersPage}>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
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