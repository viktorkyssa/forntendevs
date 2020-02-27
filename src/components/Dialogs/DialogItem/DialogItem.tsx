import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'

import {DialogType} from "../../../types/types"

import classes from './DialogItem.module.css'

const DialogItem: FC<DialogType> = ({id, name}) =>
    <li className={`${classes.dialog} ${classes.active}`}>
        <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </li>

export default DialogItem
