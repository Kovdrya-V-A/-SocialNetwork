import React from 'react';
import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo";
import {
    setChangeAvaIsActive, setNewStatusThunkCreator,
    setProfileInfoThunkCreator,
} from "../../../Redux/Reducers/ProfilePageReducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";


let mapStateToProps = (state) => {
    return {
        changeAvaIsActive: state.profilePage.changeAvaIsActive,
        profileData:state.profilePage.profileData,
        status: state.profilePage.status
    }
}

class ProfileInfoService extends React.Component {

    componentDidMount() {
        this.props.setProfileInfoThunkCreator(this.props.profileId)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    onSetChangeAvaIsActive = (changeAvaIsActive) => {
        this.props.setChangeAvaIsActive(changeAvaIsActive)
    }

    onSetNewStatus = (newStatusText) => {
        this.props.setNewStatusThunkCreator(newStatusText)
    }

    render() {
        return (
            <ProfileInfo
                isAuthProfile = {this.props.profileId}
                changeAvaIsActive={this.props.changeAvaIsActive}
                profileData={this.props.profileData}
                status={this.props.status}
                onSetChangeAvaIsActive={this.onSetChangeAvaIsActive}
                onSetNewStatus={this.onSetNewStatus}
            />
        )
    }
}

const ProfileInfoContainer = compose(
    connect(mapStateToProps, {
    setChangeAvaIsActive,
    setProfileInfoThunkCreator,
    setNewStatusThunkCreator
})
) (ProfileInfoService)

export default ProfileInfoContainer;