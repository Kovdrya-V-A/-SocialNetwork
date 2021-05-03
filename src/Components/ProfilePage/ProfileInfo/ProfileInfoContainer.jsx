import React from 'react';
import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo";
import {setProfileInfoActionCreator} from "../../../Redux/Reducers/ProfilePageReducer";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        serverLink: state.authorizationPage.serverLink
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setProfileInfo: (profileData) => {
            dispatch(setProfileInfoActionCreator(profileData))
        }
    }
}

class ProfileInfoService extends React.Component {

    componentDidMount() {
        axios.get(`http://${this.props.serverLink}/authProfileInfo?token=${localStorage.getItem("userToken")}`)
            .then(response => {
                    this.props.setProfileInfo(response.data)
            })
    }

    render() {
        return (
            <ProfileInfo profileData = {this.props.profilePage.profileData}/>
        )
    }
}

const ProfileInfoContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileInfoService)

export default ProfileInfoContainer;