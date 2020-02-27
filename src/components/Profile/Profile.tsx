import React, {FC} from 'react'

import {ProfileType} from "../../types/types"

import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: () => void
    saveProfile: () => void
}

const Profile: FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
  return (
    <div>
      <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}
                   isOwner={isOwner} savePhoto={savePhoto} saveProfile={saveProfile} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile
