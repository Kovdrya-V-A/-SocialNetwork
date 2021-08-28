import React from 'react';
import {connect} from "react-redux";
import SelectedProfilePage from "./SelectedProfilePage";
import {
    followActionCreator, setIsWroteActionCreator,
    setUserPostsActionCreator,
    setUserProfileInfoActionCreator, unFollowActionCreator
} from "../../Redux/Reducers/SelectedUserProfilePageReducer";
import * as axios from "axios";
import {setCurrentDialogActionCreator} from "../../Redux/Reducers/DialogsPageReducer";
import {withRouter} from "react-router-dom";


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
        axios.get(`http://${this.props.serverLink}/user?token=${localStorage.getItem("userToken")}&id=${userId}`)
            .then(response => {
                this.props.setUserProfileInfo(response.data.userInfo)
                if (response.data.posts[0]) {
                    this.props.setUserPosts(response.data.posts)
                }
            })
    }


    onUnfollow = (userId) => {
        axios.post(`http://${this.props.serverLink}/followFriend`,
            {
                "token": localStorage.getItem("userToken"),
                "userId": userId,
                "follow": false

            })
            .then(response => {
                this.props.unfollow(userId, response.data.message)
            })
    }

    onFollow = (userId) => {
        axios.post(`http://${this.props.serverLink}/followFriend`,
            {
                "token": localStorage.getItem("userToken"),
                "userId": userId,
                "follow": true

            })
            .then(response => {
                console.log(response)
                this.props.follow(userId, response.data.message)
            })
    }

    onMessage = (userId) => {
        axios.post(`http://${this.props.serverLink}/createDialog`, {
            "token": localStorage.getItem("userToken"),
            "userId": userId
        })
            .then((response) => {
                this.props.setIsWrote(true)
                this.props.setCurrentDialog(response.data.idDialog)
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
