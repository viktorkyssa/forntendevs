import React from 'react'

const Friend = ({friendInfo: img, name}) => {
  return(
    <li>
      <figure>
        <img src={img} alt="Img"/>
      </figure>
      <p>{name}</p>
    </li>
  )
}

export default Friend
