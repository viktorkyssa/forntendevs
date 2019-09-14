import React, {useState,useEffect} from 'react'
import classes from './ProfileStatus.module.css'

const ProfileStatus = (props) => {
    let [editMode,setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return(
        <>
            {!editMode &&
                <div className={classes.statusWrapper}>
                    <p onDoubleClick={activateEditMode}>{props.status || "-----"}</p>
                </div>
            }
            {editMode &&
                <div className={classes.statusWrapper}>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>
            }
        </>
    )
}

export default ProfileStatus