import React, {useState, useEffect, FC, ChangeEvent} from 'react'

import classes from './ProfileStatus.module.css'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType> = (props) => {
    let [editMode,setEditMode] = useState<boolean>(false)
    let [status, setStatus] = useState<string>(props.status)

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

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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