import React, {FC, useEffect} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {useHistory} from 'react-router-dom'
import * as queryString from "querystring"

import {follow, unfollow, requestUsers, FilterType} from '../../redux/users-reducer'
import {
    getPageSize, getTotalUsersCount,
    getCurrentPage, getIsFetching, getFollowingInProgress, getUsers, getUsersFilter
} from '../../redux/users-selectors'
import {AppStateType} from "../../redux/redux-store"
import {UserType} from "../../types/types"

import Users from './Users'
import Preloader from '../common/Preloader/Preloader'

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    follow: (id: number) => void
    unfollow: (id: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
type QueryParamsType = { term?: string; page?: string; friend?: string }

const UsersContainer: FC<PropsType> = ({
                                           currentPage, pageSize, filter, requestUsers,
                                           pageTitle, isFetching, totalUsersCount, users,
                                           followingInProgress
                                       }) => {
    const history = useHistory()

    useEffect(() => {
        const parsedSearch = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        const actualPage = !!parsedSearch.page ? Number(parsedSearch.page) : currentPage
        let actualFilter = filter

        if (!!parsedSearch.term) actualFilter = {...actualFilter, term: parsedSearch.term as string}
        if (!!parsedSearch.friend) {
            actualFilter = {
                ...actualFilter,
                friend: parsedSearch.friend === 'null' ? null : parsedSearch.friend === 'true'
            }
        }

        requestUsers(actualPage, pageSize, actualFilter)
    }, [currentPage, pageSize, filter])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        requestUsers(pageNumber, pageSize, filter)
    }

    const onFilterChanged = (filter: FilterType) => {
        requestUsers(1, pageSize, filter)
    }

    return <>
        <h2>{pageTitle}</h2>
        {isFetching ? <Preloader/> : null}
        <Users totalUsersCount={totalUsersCount}
               pageSize={pageSize}
               currentPage={currentPage}
               onPageChanged={onPageChanged}
               onFilterChanged={onFilterChanged}
               users={users}
               follow={follow}
               unfollow={unfollow}
               followingInProgress={followingInProgress}
        />
    </>
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
})

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {follow, unfollow, requestUsers})
)(UsersContainer)
