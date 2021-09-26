import React, {useEffect, useState} from "react"
import s from "./ProfileInfo.module.css"

const ProfileStatus = (props) => {

    let [editMode, toggleEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    let activateEditMode = () => {
        toggleEditMode(true)
    }
    let deactivateEditMode = () => {
        toggleEditMode(false)
    }

    let onStatusTextChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    let onSetNewStatus = () => {
        deactivateEditMode()
        props.onSetNewStatus(status)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])



    return <div className={s.ProfileStatus}>
        {!editMode ? <div>
                <span className={props.isMyProfile ? s.statusValue: s.strangerStatusValue} onDoubleClick={props.isMyProfile ? activateEditMode:null}>
                    {props.status}
                </span>
            </div>
            :
            <div className={s.inputStatusArea}>
                <input onChange={onStatusTextChange} autoFocus={true} onBlur={onSetNewStatus} className={s.inputStatus}
                       value={status}></input>
            </div>}


    </div>
}

export default React.memo(ProfileStatus)