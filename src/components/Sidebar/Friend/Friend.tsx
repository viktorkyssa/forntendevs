import React from 'react'

type PropsType = {
    img: string
    name: string
}

const Friend: React.FC<PropsType> = ({img, name}) => {
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
