import React from 'react'
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from "./ProfileStatus/ProfileStatus"

const ProfileInfo = (props) => {
  if(!props.profile) return <Preloader />

  let contacts = props.profile.contacts   
  let contactsArr = []

  for(var prop in contacts) {
    contactsArr = [...contactsArr, {prop : contacts[prop]}]
  }

  return (
    <div>
      <div className={classes.avatar_content}>
        <div className={classes.logo}>
          <img src={props.profile.photos.large ? props.profile.photos.large 
            : 'https://png.pngtree.com/svg/20161212/f93e57629c.svg'} alt="Photo" />
        </div>
        <div className={classes.about}>
          <span className={classes.fullName}>{props.profile.fullName}</span>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        </div>
      </div>
      <div className={classes.contacts}>
       {
        contactsArr.map(contact => <div className={classes.contacts__item}><span>{Object.entries(contact)[0]}:</span><span>{Object.entries(contact)[1]}</span></div>    )
       }                
      </div>
      <div className={classes.job}>

      </div>
    </div>
  )
}

export default ProfileInfo
