import React from 'react'
import classes from "./ProfileInfo.module.css"
import {Input, Textarea} from "../../common/FormsControls/FormsControls"
import {required} from "../../../utils/validators/validators"
import {Field, reduxForm} from "redux-form"

const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return(
        <form className={classes.editProfile} onSubmit={handleSubmit}>
            {<button className={classes.editBtn}>Save</button>}
            {error && <div className={classes.error}>{error}</div>}
            <ul>
                <li><b>Full name: </b> <Field placeholder={"Full name"} name={"fullName"} component={Input} validate={[required]} /></li>
                <li><b>Looking for a job: </b> <Field name='lookingForAJob' component={Input} type='checkbox' /> </li>
                <li><b>My proffesional skills: </b> <Field placeholder='My Proffesionals skills' name='lookingForAJobDescription' component={Textarea} /></li>
                <li><b>About me: </b> <Field placeholder='About me' name='aboutMe' component={Textarea} /></li>
                <li><b>Contacts: </b> <ul>{Object.keys(profile.contacts).map(key => <div key={key} className={classes.editContact}><b>{key}:</b>
                    <Field placeholder={key} name={`contacts.${key}`} component={Input} />
                </div>)}</ul></li>
            </ul>
        </form>
    )
}

export const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)