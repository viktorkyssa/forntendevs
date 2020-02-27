import React, {FC} from 'react'

import {PostType} from "../../../../types/types"

import classes from './Post.module.css'

type PropsType = {
    postData: PostType
}

const Post: FC<PropsType> = ({postData}) => {
  return (
    <div className={classes.item}>
      <span className={classes.like}>{postData.likes}</span>
      {postData.message}
    </div>
  )
}

export default Post
