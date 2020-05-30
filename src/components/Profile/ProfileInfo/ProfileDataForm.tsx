import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form"

import {ProfileType} from "../../../types/types"

import {Input, Textarea} from "../../common/FormsControls/FormsControls"
import {required} from "../../../utils/validators/validators"

import classes from "./ProfileInfo.module.css"

type PropsType = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({profile, handleSubmit, error}) => {
    return(
        <form className={classes.editProfile} onSubmit={handleSubmit}>
            {<button className={classes.editBtn}>Save</button>}
            {error && <div className={classes.error}>{error}</div>}
            <ul className={classes.editProfile__list}>
                <li>
                    <b>Full name: </b>
                    <Field placeholder={"Full name"} name={"fullName"} component={Input} validate={[required]} />
                </li>
                <li>
                    <b>Looking for a job: </b>
                    <Field name='lookingForAJob' component={Input} type='checkbox' />
                </li>
                <li>
                    <b>My proffesional skills: </b>
                    <Field placeholder='My Proffesionals skills' name='lookingForAJobDescription' component={Textarea} />
                </li>
                <li>
                    <b>About me: </b>
                    <Field placeholder='About me' name='aboutMe' component={Textarea} />
                </li>
                <li>
                    <b>Contacts: </b>
                    <ul>{Object.keys(profile.contacts).map(key => {
                        return (
                            <div key={key} className={classes.editContact}><b>{key}:</b>
                                <Field placeholder={key} name={`contacts.${key}`} component={Input} />
                            </div>
                        )
                    })}</ul>
                </li>
            </ul>
        </form>
    )
}

export const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)