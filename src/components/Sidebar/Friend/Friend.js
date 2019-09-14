import React from 'react'
import classes from './Friend.module.css'

const Friend = (props) => {
  return(
    <li>
      <figure>
        <img src={props.friendInfo.img} alt="Img"/>
      </figure>
      <p>{props.friendInfo.name}</p>
    </li>
  )
}

export default Friend
