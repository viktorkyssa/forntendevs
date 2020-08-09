import React from 'react'
import {useSelector} from 'react-redux'

import {getIsFetching} from '../../redux/users-selectors'

import {Users} from "./Users";
import Preloader from '../common/Preloader/Preloader'

type UserPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UserPagePropsType> = ({pageTitle}) => {
    const isFetching = useSelector(getIsFetching)

    return <>
        <h2>{pageTitle}</h2>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}
