import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
  return (
    <div>
      <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}
                   isOwner={isOwner} savePhoto={savePhoto} saveProfile={saveProfile} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile
