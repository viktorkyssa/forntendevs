import React from 'react'
import classes from './Post.module.css'

const Post = ({postData}) => {
  return (
    <div className={classes.item}>
      <span className={classes.like}>{postData.likes}</span>
      {postData.message}
    </div>
  )
}

export default Post
