import React from 'react';
import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo";
import {
    setChangeAvaIsActiveActionCreator,
    setProfileInfoActionCreator
} from "../../../Redux/Reducers/ProfilePageReducer";
import {getMyProfileInfoRequest} from "../../../DAL/ApiRequests";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        serverLink: state.authorizationPage.serverLink
    }
}

class ProfileInfoService extends React.Component {

    componentDidMount() {
        getMyProfileInfoRequest()
            .then(data => {
                this.props.setProfileInfo(data)
                localStorage.setItem("authUserId", data.id)
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