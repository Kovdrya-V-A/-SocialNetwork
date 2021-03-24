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


const Profile = (props) => {

    return (
        <div className={s.profile}>
            <ScreenSaver/>
            <ProfileInfo name={props.profilePage.profileData[0].name}
                         date={props.profilePage.profileData[0].date}
                         address={props.profilePage.profileData[0].address}
                         imgSrc={props.profilePage.profileData[0].imgSrc}/>
            <MyPosts postsData={props.profilePage.postsData} newPostText = {props.profilePage.newPostText} addPost = {props.addPost} postTextChange = {props.postTextChange}/>
        </div>
    )
}
export default Profile;