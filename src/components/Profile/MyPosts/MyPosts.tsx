import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form"

import {maxLengthCreator, required} from "../../../utils/validators/validators"
import {PostType} from "../../../types/types"

import Post from './Post/Post'
import {Textarea} from "../../common/FormsControls/FormsControls"

import classes from './MyPosts.module.css'

const maxLength10 = maxLengthCreator(10)

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}
const MyPosts: React.FC<PropsType> = React.memo(props => {
  let postsTemplate = props.posts.map(post => <Post key={post.id} postData={post} />)

  const addPostHandle = (values: any) => {
      props.addPost(values.newPostText)
  }

  return (
    <div className={classes.my_posts}>
        <PostFormRedux onSubmit={addPostHandle} />
        <div className={classes.posts}>
          {postsTemplate}
        </div>
    </div>
  )
})

type PostFormType = {

}
type FormPostValuesType = {
    newPostText: string
}
// type PostFormValuesTypeKeys = GetStringKeys<FormPostValuesType>
const PostForm: React.FC<InjectedFormProps<FormPostValuesType, PostFormType> & PostFormType> = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className={classes.new_post}>
            <Field component={Textarea} name={"newPostText"} placeholder={"Post message"}
                    validate={[required, maxLength10]} />
            <button className="btn">Add Post</button>
        </form>
    )
}

// @ts-ignore
const PostFormRedux = reduxForm({form: "postForm"})(PostForm)

export default MyPosts
