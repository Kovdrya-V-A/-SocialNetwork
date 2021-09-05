import React from 'react';
import s from "./ProfilePage.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";


const ProfilePage = (props) => {
    return (
        <div className={s.profilePage}>
            <ProfileInfoContainer/>
            <MyPostsContainer/>
        </div>
    )
}
export default React.memo(ProfilePage);