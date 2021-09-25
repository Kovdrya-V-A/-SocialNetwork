import React, {useState} from 'react';
import s from "./ProfilePage.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";


const ProfilePage = (props) => {

    const [profileId, setProfileId] = useState(props.profileId)

    return (
        <div className={s.profilePage}>
            <ProfileInfoContainer profileId = {profileId}/>
            <MyPostsContainer profileId = {profileId}/>
        </div>
    )
}
export default React.memo(ProfilePage);