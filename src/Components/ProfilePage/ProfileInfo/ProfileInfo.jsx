import s from './ProfileInfo.module.css'
import React from 'react';
import FileUploadContainer from "./addImg";


const ProfileInfo = (props) => {
    return (
        <div className={s.profileInfoWrap}>
            <div className={s.profileInfo}>
                <div className={s.ava}>
                    <img alt="ava"
                         src={props.profileData[0].img}/>
                </div>
                <div className={s.userData}>
                    <p className={s.name}>{props.profileData[0].name}</p>
                    <p>Возраст: {props.profileData[0].age}</p>
                    <p>Адрес: {props.profileData[0].address}</p>
                </div>
            </div>
            <button onClick={() => props.onSetChangeAvaIsActive(true)} className={s.changeAvaButton}>Обновить фото</button>
                {props.changeAvaIsActive ? <FileUploadContainer/> : null}
        </div>
    )

}

export default ProfileInfo;