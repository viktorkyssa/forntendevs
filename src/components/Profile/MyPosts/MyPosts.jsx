import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Post/Post'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators"
import {Textarea} from "../../common/FormsControls/FormsControls"

const maxLength10 = maxLengthCreator(10)

const MyPosts = React.memo(props => {
  let postsTemplate = props.posts.map(post => <Post key={post.id} postData={post} />)

  const addPost = ({newPostText}) => {
      props.addPost(newPostText)
  }

  return (
    <div className={classes.my_posts}>
        <PostFormRedux onSubmit={addPost} />
        <div className={classes.posts}>
          {postsTemplate}
        </div>
    </div>
  )
})

const PostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className={classes.new_post}>
            <Field component={Textarea} name={"newPostText"} placeholder={"Post message"}
                    validate={[required, maxLength10]} />
            <button className="btn">Add Post</button>
        </form>
    )
}

const PostFormRedux = reduxForm({form: "postForm"})(PostForm)

export default MyPosts
