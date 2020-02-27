import {connect} from 'react-redux'

import {addPost} from "../../../redux/profile-reducer"
import {PostType} from "../../../types/types"
import {AppStateType} from "../../../redux/redux-store"

import MyPosts from './MyPosts'

type MapStatePropsType = {
    posts: Array<PostType>
}

type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    posts: state.profilePage.posts
})

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>
        (mapStateToProps,{addPost})(MyPosts)

export default MyPostsContainer
