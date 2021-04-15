import React from 'react';
import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo";
import {setProfileInfoActionCreator} from "../../../Redux/ProfilePageReducer";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setProfileInfo: (profileData) => {dispatch(setProfileInfoActionCreator(profileData))}
    }
}

const ProfileInfoContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)

export default ProfileInfoContainer;