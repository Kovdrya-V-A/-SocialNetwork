import s from './ProfileInfo.module.css'
import React from 'react';

const ProfileInfo = (props) => {
    return (
        <div className={s.profileInfo}>
                <div className={s.ava}>
                <img alt="ava"
                     src={props.imgSrc}/>
            </div>
            <div className={s.userData}>
                <h4>{props.name}</h4>
                <p>Day of Birth: {props.date}</p>
                <p>Address: {props.address}</p>
            </div>
        </div>
    )
}

export default ProfileInfo;