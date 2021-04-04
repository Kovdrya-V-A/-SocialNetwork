import React from 'react';
import s from "./ProfilePage.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const ProfilePage = (props) => {

    return (
        <div className={s.profilePage}>

            <ProfileInfo name={props.profilePage.profileData[0].name}
                         date={props.profilePage.profileData[0].date}
                         address={props.profilePage.profileData[0].address}
                         imgSrc={props.profilePage.profileData[0].imgSrc}/>
            <MyPostsContainer/>
        </div>
    )
}
export default ProfilePage;