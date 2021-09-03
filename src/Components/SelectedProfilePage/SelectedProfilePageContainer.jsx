import React from 'react';
import {connect} from "react-redux";
import SelectedProfilePage from "./SelectedProfilePage";
import {setCurrentDialog, setCurrentDialogActionCreator} from "../../Redux/Reducers/DialogsPageReducer";
import {withRouter} from "react-router-dom";
import {
    follow, followThunkCreator, goToDialogThunkCreator,
    setIsWrote, setSelectedUserProfileThunkCreator,
    setUserPosts,
    setUserProfileInfo, toggleFollowingProgress, toggleSetIsWroteProgress,
    unFollow, unFollowThunkCreator
} from "../../Redux/Reducers/SelectedUserProfilePageReducer";
import {CheckAuthRedirect} from "../../HOC/CheckAuth";


let mapStateToProps = (state) => {
    return {
        isWrote: state.selectedProfilePage.isWrote,
        selectedProfilePage: state.selectedProfilePage,
        serverLink: state.authorizationPage.serverLink,
        currentDialogId: state.dialogsPage.currentDialogId,
        setIsWroteInProgress: state.selectedProfilePage.setIsWroteInProgress,
        followingInProgress: state.selectedProfilePage.followingInProgress,

    }
}

class SelectedProfilePageContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        this.props.setSelectedUserProfileThunkCreator(userId)
    }

    componentWillUnmount() {
        this.props.setIsWrote(false)
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


    render() {
        return (
            <SelectedProfilePage
                currentDialogId={this.props.currentDialogId}
                isWrote={this.props.isWrote}
                onUnfollow={this.onUnfollow}
                onFollow={this.onFollow}
                onMessage={this.onMessage}
                postsData={this.props.selectedProfilePage.postsData}
                profileData={this.props.selectedProfilePage.profileData}
                setIsWroteInProgress={this.props.setIsWroteInProgress}
                followingInProgress={this.props.followingInProgress}/>
        )
    }

}

let WithRouterSelectedProfilePageContainer = withRouter(SelectedProfilePageContainer)

let CheckAuthSelectedProfilePage = CheckAuthRedirect(WithRouterSelectedProfilePageContainer)


export default connect(mapStateToProps, {
    setUserPosts,
    setUserProfileInfo,
    unFollow,
    follow,
    setIsWrote,
    setCurrentDialog,
    toggleSetIsWroteProgress,
    toggleFollowingProgress,
    setSelectedUserProfileThunkCreator,
    followThunkCreator,
    goToDialogThunkCreator,
    unFollowThunkCreator

})(CheckAuthSelectedProfilePage)
