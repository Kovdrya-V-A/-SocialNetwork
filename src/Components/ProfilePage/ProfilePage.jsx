import React, {useState} from 'react';
import s from "./ProfilePage.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";


const ProfilePage = (props) => {
    return (
        <div className={s.profilePage}>
            <ProfileInfoContainer isMyProfile={props.isMyProfile} profileId = {props.profileId}/>
            <MyPostsContainer isMyProfile={props.isMyProfile} profileId = {props.profileId}/>
        </div>
    )
}
export default React.memo(ProfilePage);