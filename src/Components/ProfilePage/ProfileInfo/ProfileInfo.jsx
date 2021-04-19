import s from './ProfileInfo.module.css'
import React from 'react';


const ProfileInfo = (props) => {


        return (
            <div className={s.profileInfo}>
                <div className={s.ava}>
                    <img alt="ava"
                         src={props.profileData[0].imgSrc}/>
                </div>
                <div className={s.userData}>
                    <h4>{props.profileData[0].name}</h4>
                    <p>Day of Birth: {props.profileData[0].date}</p>
                    <p>Address: {props.profileData[0].address}</p>
                </div>
            </div>
        )

}

export default ProfileInfo;