import s from './ProfileInfo.module.css'
import React from 'react';
import FileUploadContainer from "./addImg";
import ProfileStatus from "./ProfileStatus";


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
                    <ProfileStatus onSetNewStatus ={props.onSetNewStatus}
                                   status = {props.status}
                    />
                    <p>Возраст: {props.profileData[0].age}</p>
                    <p>Адрес: {props.profileData[0].address}</p>
                    {props.profileData[0].followed ? <div className={s.followedStatus}><p>Ваш друг</p></div> : null}
                </div>
            </div>
            <div className={s.activity}>
                {!props.profileId ?
                    <div>
                        <button onClick={() => props.onSetChangeAvaIsActive(true)} className={s.activityButton}>Обновить
                            фото</button>
                    </div> :
                    <div>
                        <button disabled={props.setIsWroteInProgress} onClick={() => {
                            props.onMessage(props.profileData[0].userId)
                        }} className={s.activityButton}>Написать
                        </button>
                        {props.profileData[0].followed ?
                            <button disabled={props.followingInProgress}
                                    onClick={() => props.onUnfollow(props.profileData[0].userId)}
                                    className={s.activityButton}>Удалить</button> :
                            <button disabled={props.followingInProgress}
                                    onClick={() => props.onFollow(props.profileData[0].userId)}
                                    className={s.activityButton}>Добавить</button>}
                    </div>
                }
                {props.changeAvaIsActive ? <FileUploadContainer/> :null}
            </div>
        </div>
    )

}

export default React.memo(ProfileInfo);