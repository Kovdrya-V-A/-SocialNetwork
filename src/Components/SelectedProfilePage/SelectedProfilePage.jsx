import React from 'react';
import s from "./SelectedProfilePage.module.css";
import {Redirect} from "react-router-dom";

const SelectedProfilePage = (props) => {
    return (
        <div className={s.selectedProfilePage}>

            <UserProfileInfo profileData={props.profileData}/>

            <div className={s.activity}>
                {
                    props.isWrote && props.currentDialogId ? <Redirect to={"/AuthUser/DialogsPage/" + props.currentDialogId}/> : null
                }
                <button onClick={() => {
                    props.onMessage(props.profileData[0].userId)
                }} className={`${s.toMessageButton} ${s.button}`}>Написать
                </button>
                {props.profileData[0].followed ?
                    <button onClick={() => props.onUnfollow(props.profileData[0].userId)}
                            className={`${s.unfollowButton} ${s.button}`}>Удалить</button> :
                    <button onClick={() => props.onFollow(props.profileData[0].userId)}
                            className={`${s.followButton} ${s.button}`}>Добавить</button>}
            </div>

            <UserPosts postsData={props.postsData}
                       avaImg={props.profileData[0].img}
                       name = {props.profileData[0].name}/>
        </div>
    )
}

const UserProfileInfo = (props) => {

    return (
        <div className={s.profileInfo}>
            <div className={s.ava}>
                <img alt="ava"
                     src={props.profileData[0].img}/>
            </div>
            <div className={s.userData}>
                <p className={s.userName}>{props.profileData[0].name}</p>
                <p>Возраст: {props.profileData[0].age}</p>
                <p>Адрес: {props.profileData[0].address}</p>
                {props.profileData[0].followed ? <div className={s.followedStatus}><p>Ваш друг</p></div> : null}
            </div>
        </div>
    )

}

const UserPosts = (props) => {

    let postsItems =
        props.postsData.map(p => <div  key={p.idPost} className={s.postBox}>
            <div className={s.avaPost}>
                <img src={props.avaImg} alt="avapost"/>
            </div>
            <div className={s.postContent}>
                <div className={s.name}><p>{props.name}</p></div>
                <div className={s.postText}>
                    <p>{p.text}</p>
                </div>
                <div className={s.dateTime}><p>{p.dateTime}</p>
                </div>
            </div>
        </div>)

    return (
        <div className={s.userPosts}>
            <h2>Посты пользователя:</h2>
            {props.postsData.length > 0 ? postsItems: "У пользователя пока нет постов."}
        </div>
    )
}


export default SelectedProfilePage