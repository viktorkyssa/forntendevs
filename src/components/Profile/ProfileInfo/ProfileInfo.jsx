import React, {useState} from 'react'
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from "./ProfileStatus/ProfileStatus"
import userPhoto from '../../../assets/img/user.png'
import {ProfileDataFormReduxForm} from "./ProfileDataForm"

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
  let [editMode, setEditMode] = useState(false)

  if(!profile) return <Preloader />

  const onMainPhotoSelected = e => {
      if(e.target.files.length) {
          savePhoto(e.target.files[0])

      }
  }

  const onSubmit = (formData) => {
      saveProfile(formData).then(() => {
          setEditMode(false)
      })
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
        {editMode ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}} />}
    </div>
  )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return(
        <div className={classes.contacts}>
            {isOwner && <button className={classes.editBtn} onClick={goToEditMode}>Edit</button>}
            <ul>
                <li><b>Looking for a job: </b> {profile.lookingForAJob ? 'yes' : 'no' }</li>
                {profile.lookingForAJob && <li><b>My proffesional skills: </b> {profile.lookingForAJobDescription}</li>}
                <li><b>About me: </b> {profile.aboutMe}</li>
                <li><b>Contacts: </b> <ul>{Object.keys(profile.contacts).map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />)}</ul></li>
            </ul>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => <li><b>{contactTitle}:</b>{contactValue}</li>

export default ProfileInfo
