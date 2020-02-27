import React, {FC} from 'react'
import {MessageType} from "../../../types/types"

import classes from './Message.module.css'

const Message: FC<MessageType> = ({id, message}) => {
  return (
    <div className={classes.message}>
      <figure>
        <img src="https://images.axios.com/078ps5QcbNgqsgEI_QkV9hDW9PQ=/0x0:3900x2194/1920x1080/2018/08/25/1535212462538.jpg" alt="User Avatar"/>
      </figure>
      <p>{message}</p>
    </div>
  )
}

export default Message
