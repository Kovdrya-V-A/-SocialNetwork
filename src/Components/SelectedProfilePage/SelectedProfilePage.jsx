import React from 'react';
import s from "./SelectedProfilePage.module.css";

const SelectedProfilePage = (props) => {
    return (
        <div>
            <UserProfileInfo profileData={props.profileData}/>
            <UserPosts postsData={props.postsData}
                       avaImg={props.profileData[0].img}/>
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
                <h4>{props.profileData[0].FirstName} {props.profileData[0].LastName}</h4>
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
                <div className={s.postText}>
                    {p.text}
                </div>
            </div>
        </div>)

    let text = React.createRef()

    return (
        <div className={s.userPosts}>
            <h2>Посты пользователя:</h2>
            {postsItems}
        </div>
    )
}


export default SelectedProfilePage