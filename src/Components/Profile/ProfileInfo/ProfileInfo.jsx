import s from './ProfileInfo.module.css'
import React from 'react';

const ProfileInfo = (props) => {
    return (
        <div className={s.profileInfo}>
                <div className={s.ava}>
                <img alt="ava"
                     src="https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album"/>
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