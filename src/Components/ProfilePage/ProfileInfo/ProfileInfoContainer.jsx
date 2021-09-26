import React from 'react';
import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo";
import {
    followThunkCreator, goToDialogThunkCreator,
    setChangeAvaIsActive, setNewStatusThunkCreator,
    setProfileInfoThunkCreator, unFollowThunkCreator,
} from "../../../Redux/Reducers/ProfilePageReducer";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        changeAvaIsActive: state.profilePage.changeAvaIsActive,
        profileData: state.profilePage.profileData,
        status: state.profilePage.status,
        setIsWroteInProgress: state.profilePage.setIsWroteInProgress,
        followingInProgress: state.profilePage.followingInProgress,
    }
}

class ProfileInfoService extends React.Component {

    componentDidMount() {
        this.props.setProfileInfoThunkCreator(this.props.profileId)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.profileId !==this.props.profileId) {
            this.props.setProfileInfoThunkCreator(this.props.profileId)
        }
    }

    onUnfollow = (userId) => {
        this.props.unFollowThunkCreator(userId)
    }

    onFollow = (userId) => {
        this.props.followThunkCreator(userId)
    }

    onMessage = (userId) => {
        this.props.goToDialogThunkCreator(userId)
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
                profileId={this.props.profileId}
                changeAvaIsActive={this.props.changeAvaIsActive}
                profileData={this.props.profileData}
                status={this.props.status}
                onSetChangeAvaIsActive={this.onSetChangeAvaIsActive}
                onSetNewStatus={this.onSetNewStatus}
                onUnfollow={this.onUnfollow}
                onFollow={this.onFollow}
                onMessage={this.onMessage}
                setIsWroteInProgress={this.props.setIsWroteInProgress}
                followingInProgress={this.props.followingInProgress}
            />
        )
    }
}

const ProfileInfoContainer = compose(
    connect(mapStateToProps, {
        setChangeAvaIsActive,
        setProfileInfoThunkCreator,
        setNewStatusThunkCreator,
        unFollowThunkCreator,
        followThunkCreator,
        goToDialogThunkCreator,
    })
)(ProfileInfoService)

export default ProfileInfoContainer;