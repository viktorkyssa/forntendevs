import React from 'react'
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from "./ProfileStatus/ProfileStatus"
import userPhoto from '../../../assets/img/user.png'

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
  if(!profile) return <Preloader />

  let contacts = profile.contacts
  let contactsArr = []

  for(var prop in contacts) {
    contactsArr = [...contactsArr, {prop : contacts[prop]}]
  }

  const onMainPhotoSelected = e => {
      if(e.target.files.length) {
          savePhoto(e.target.files[0])

      }
  }

  return (
    <div>
      <div className={classes.avatar_content}>
        <div className={classes.avatar__logo_wrapper}>
            <div className={classes.logo}>
                <img src={profile.photos.large || userPhoto} alt="Photo" />
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
      <div className={classes.contacts}>
       {
        contactsArr.map(contact => <div className={classes.contacts__item}>
            <span>{Object.entries(contact)[0]}:</span><span>{Object.entries(contact)[1]}</span>
        </div>)
       }                
      </div>
      <div className={classes.job}>

      </div>
    </div>
  )
}

export default ProfileInfo
