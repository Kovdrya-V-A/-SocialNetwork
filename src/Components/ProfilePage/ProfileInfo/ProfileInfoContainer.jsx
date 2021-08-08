import React from 'react';
import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo";
import {
    setChangeAvaIsActiveActionCreator,
    setProfileInfoActionCreator
} from "../../../Redux/Reducers/ProfilePageReducer";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        serverLink: state.authorizationPage.serverLink
    }
}

class ProfileInfoService extends React.Component {

    componentDidMount() {
        axios.get(`http://${this.props.serverLink}/authProfileInfo?token=${localStorage.getItem("userToken")}`)
            .then(response => {
                this.props.setProfileInfo(response.data)
                localStorage.setItem("authUserId", response.data.id)
            })
    }

    onSetChangeAvaIsActive = (changeAvaIsActive) => {
        this.props.setChangeAvaIsActive(changeAvaIsActive)
    }


    render() {
        return (
            <ProfileInfo
                changeAvaIsActive={this.props.profilePage.changeAvaIsActive}
                profileData={this.props.profilePage.profileData}
                onSetChangeAvaIsActive={this.onSetChangeAvaIsActive}/>
        )
    }
}

const ProfileInfoContainer = connect(mapStateToProps, {
    setProfileInfo:setProfileInfoActionCreator,
    setChangeAvaIsActive: setChangeAvaIsActiveActionCreator
})(ProfileInfoService)

export default ProfileInfoContainer;