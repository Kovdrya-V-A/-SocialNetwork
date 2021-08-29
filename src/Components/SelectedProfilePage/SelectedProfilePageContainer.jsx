import React from 'react';
import {connect} from "react-redux";
import SelectedProfilePage from "./SelectedProfilePage";
import {
    followActionCreator, setIsWroteActionCreator,
    setUserPostsActionCreator,
    setUserProfileInfoActionCreator, unFollowActionCreator
} from "../../Redux/Reducers/SelectedUserProfilePageReducer";
import {setCurrentDialogActionCreator} from "../../Redux/Reducers/DialogsPageReducer";
import {withRouter} from "react-router-dom";
import {followRequest, getSelectedUserProfileRequest, goToDialogRequest, unFollowRequest} from "../../DAL/ApiRequests";


let mapStateToProps = (state) => {
    return {
        isWrote: state.selectedProfilePage.isWrote,
        selectedProfilePage: state.selectedProfilePage,
        serverLink: state.authorizationPage.serverLink,
        currentDialogId: state.dialogsPage.currentDialogId
    }
}

class SelectedProfilePageContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        getSelectedUserProfileRequest (userId)
            .then(data => {
                this.props.setUserProfileInfo(data.userInfo)
                if (data.posts[0]) {
                    this.props.setUserPosts(data.posts)
                }
            })
    }


    onUnfollow = (userId) => {
        unFollowRequest(userId)
            .then(data => {
                this.props.unfollow(userId, data.message)
            })
    }

    onFollow = (userId) => {
       followRequest(userId)
            .then(data => {
                console.log(data)
                this.props.follow(userId, data.message)
            })
    }

    onMessage = (userId) => {
        goToDialogRequest(userId)
            .then((data) => {
                this.props.setIsWrote(true)
                this.props.setCurrentDialog(data.idDialog)
            })
    }


    render() {
        return (
            <SelectedProfilePage
                currentDialogId = {this.props.currentDialogId}
                isWrote={this.props.isWrote}
                onUnfollow={this.onUnfollow}
                onFollow={this.onFollow}
                onMessage={this.onMessage}
                postsData={this.props.selectedProfilePage.postsData}
                profileData={this.props.selectedProfilePage.profileData}/>
        )
    }

}

let WithRouterSelectedProfilePageContainer = withRouter(SelectedProfilePageContainer)

export default connect(mapStateToProps, {
    setUserPosts: setUserPostsActionCreator,
    setUserProfileInfo:setUserProfileInfoActionCreator,
    unfollow: unFollowActionCreator,
    follow: followActionCreator,
    setIsWrote: setIsWroteActionCreator,
    setCurrentDialog: setCurrentDialogActionCreator,

})(WithRouterSelectedProfilePageContainer)
