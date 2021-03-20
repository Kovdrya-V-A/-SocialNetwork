import React from 'react';
import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const ScreenSaver = () => {
    return (
        <div className={s.screensaver}>
            <img alt="screensaver"
                 src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"/>
        </div>
    )
}


const Profile = () => {

    return (
        <div className={s.profile}>
            <ScreenSaver/>
            <ProfileInfo name = "Михуил" date = "06.12.2004" address = "Под шконкой"/>
            <MyPosts/>
        </div>
    )
}
export default Profile;