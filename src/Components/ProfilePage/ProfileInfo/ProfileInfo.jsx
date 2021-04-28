import s from './ProfileInfo.module.css'
import React from 'react';


const ProfileInfo = (props) => {


    return (
        <div className={s.profileInfo}>
            <div className={s.ava}>
                <img alt="ava"
                     src={props.profileData[0].img}/>
            </div>
            <div className={s.userData}>
                <h4>{props.profileData[0].FirstName} {props.profileData[0].LastName}</h4>
                <p>Age: {props.profileData[0].age}</p>
                <p>Address: {props.profileData[0].address}</p>
            </div>
        </div>
    )

}

export default ProfileInfo;