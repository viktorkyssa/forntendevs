import React, {ChangeEvent, useState} from 'react'
import cn from 'classnames'

import {ContactsType, ProfileType} from "../../../types/types"

import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from "./ProfileStatus/ProfileStatus"
import {ProfileDataFormReduxForm} from "./ProfileDataForm"

import userPhoto from '../../../assets/img/user.png'

import classes from './ProfileInfo.module.css'

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
  let [editMode, setEditMode] = useState(false)

  if(!profile) return <Preloader />

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.files && e.target.files.length) {
          savePhoto(e.target.files[0])
      }
  }

  const onSubmit = (formData: ProfileType) => {
      // todo: remove then
      saveProfile(formData).then(() => {
          setEditMode(false)
      })
  }

  return (
    <div className={cn(classes.profileInfo)}>
      <div className={classes.avatar_content}>
        <div className={classes.avatar__logo_wrapper}>
            <div className={classes.logo}>
                <img src={profile.photos.large || userPhoto} alt="Profile Avatar" />
            </div>
            {isOwner && <div className={classes.avatar__uploadBtn}>
                 <input type="file" onChange={onMainPhotoSelected} />
                 <span>Upload photo</span>
            </div>}
        </div>
        <div className={classes.about}>
          <span className={classes.fullName}>{profile.fullName}</span>
            <ProfileStatus status={status} updateStatus={updateStatus} />
        </div>
      </div>
        {editMode ? (
            <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
        ) : (
            <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}} />
        )}
    </div>
  )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return(
        <div className={classes.contacts}>
            {isOwner && <button className={classes.editBtn} onClick={goToEditMode}>Edit</button>}
            <ul className={classes.contacts__list}>
                <li><b>Looking for a job: </b> {profile.lookingForAJob ? 'yes' : 'no' }</li>
                {profile.lookingForAJob && <li><b>My proffesional skills: </b> {profile.lookingForAJobDescription}</li>}
                <li><b>About me: </b> {profile.aboutMe}</li>
                <li><b>Contacts: </b>
                    <ul>
                        {Object.keys(profile.contacts).map(key =>
                            <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />)}
                    </ul>
                </li>
            </ul>
        </div>
    )
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => <li><b>{contactTitle}:</b> {contactValue}</li>

export default ProfileInfo
