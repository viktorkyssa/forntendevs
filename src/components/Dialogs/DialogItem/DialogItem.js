import React from 'react'
import classes from './DialogItem.module.css'
import {NavLink} from 'react-router-dom'

const DialogItem = (props) => {
  let {id, name} = props.dialogsData

  return (
    <li className={`${classes.dialog} ${classes.active}`}>
      <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </li>
  )
}

export default DialogItem
