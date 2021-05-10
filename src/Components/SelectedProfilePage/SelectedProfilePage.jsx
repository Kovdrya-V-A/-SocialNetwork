import React from 'react';
import s from "./SelectedProfilePage.module.css";

const SelectedProfilePage = (props) => {
    return (
        <div>
            <UserProfileInfo profileData={props.profileData}/>
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
                <p className={s.name}>{props.profileData[0].name}</p>
                <p>Age: {props.profileData[0].age}</p>
                <p>Address: {props.profileData[0].address}</p>
            </div>
        </div>
    )

}

const UserPosts = (props) => {

    let postsItems =
        props.postsData.map(p => <div className={s.postBox}>
            <div className={s.avaPost}>
                <img src={props.avaImg} alt="avapost"/>
            </div>
            <div className={s.postContent}>
                <div className={s.name}><p>{props.name}</p></div>
                <div className={s.postText}>
                    {p.text}
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