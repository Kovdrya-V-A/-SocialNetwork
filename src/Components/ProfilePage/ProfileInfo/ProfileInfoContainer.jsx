import React from 'react';
import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo";
import {
    setChangeAvaIsActive,
    setProfileInfoThunkCreator
} from "../../../Redux/Reducers/ProfilePageReducer";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        serverLink: state.authorizationPage.serverLink
    }
}

class ProfileInfoService extends React.Component {

    componentDidMount() {
        this.props.setProfileInfoThunkCreator()
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
    setChangeAvaIsActive,
    setProfileInfoThunkCreator,
})(ProfileInfoService)

export default ProfileInfoContainer;