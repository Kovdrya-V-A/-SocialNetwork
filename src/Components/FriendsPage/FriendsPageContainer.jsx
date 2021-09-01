import React from 'react';
import {connect} from "react-redux";
import FriendsPage from "./FriendsPage";
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setFriendsActionCreator,
    setFriendsTotalCountActionCreator,
    setIsFetchingActionCreator,
    setIsWroteActionCreator,
    toggleFollowingProgressActionCreator, toggleIsWroteProgressActionCreator,
    unFollowActionCreator
} from "../../Redux/Reducers/FriendsPageReducer";
import {setCurrentDialogActionCreator} from "../../Redux/Reducers/DialogsPageReducer";
import {followRequest, getFriendsRequest, goToDialogRequest, unFollowRequest} from "../../DAL/ApiRequests";

let mapStateToProps = (state) => {
    return {
        friendsData: state.friendsPage.friendsData,
        pageSize: state.friendsPage.pageSize,
        totalFriendsCount: state.friendsPage.totalFriendsCount,
        currentPage: state.friendsPage.currentPage,
        isFetching: state.friendsPage.isFetching,
        isWrote: state.friendsPage.isWrote,
        serverLink: state.authorizationPage.serverLink,
        currentDialogId: state.dialogsPage.currentDialogId,
        followingInProgress: state.friendsPage.followingInProgress,
        isWroteInProgress: state.friendsPage.isWroteInProgress,
    }
}


class FriendsPageService extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true)
        getFriendsRequest(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.setIsFetching(false)
                if (data) {
                    this.props.setFriends(data.items)
                    this.props.setFriendsTotalCount(data.totalCount)
                }
            })
    }

    componentWillUnmount() {
        this.props.setIsWrote(false)
        this.props.setCurrentPage(1)
    }

    onUnfollow = (userId) => {
        this.props.toggleFollowingProgress(true, userId)
        unFollowRequest(userId)
            .then(data => {
                this.props.unfollow(userId, data.message)
                this.props.toggleFollowingProgress(false, userId)
            })
    }

    onFollow = (userId) => {
        this.props.toggleFollowingProgress(true, userId)
        followRequest(userId)
            .then(data => {
                this.props.follow(userId, data.message)
                this.props.toggleFollowingProgress(false, userId)
            })
    }

    onSetCurrentPage = (number) => {
        this.props.setCurrentPage(number)
        this.props.setIsFetching(true)
        getFriendsRequest(number, this.props.pageSize)
            .then(data => {
                this.props.setIsFetching(false)
                this.props.setFriends(data.items)
                this.props.setFriendsTotalCount(data.totalCount)
            })
    }

    onMessage = (userId) => {
        this.props.toggleIsWroteProgress(true)
        goToDialogRequest(userId)
            .then((data) => {
                this.props.setIsWrote(true)
                this.props.setCurrentDialog(data.idDialog)
                this.props.toggleIsWroteProgress(false)
            })
    }


    render() {
        return <>
            <FriendsPage
                totalFriendsCount={this.props.totalFriendsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                friendsData={this.props.friendsData}
                currentDialogId={this.props.currentDialogId}
                onSetCurrentPage={this.onSetCurrentPage}
                isWrote={this.props.isWrote}
                onUnfollow={this.onUnfollow}
                onFollow={this.onFollow}
                onMessage={this.onMessage}
                followingInProgress={this.props.followingInProgress}
                isWroteInProgress={this.props.isWroteInProgress}
            />

        </>
    }
}


const FriendsPageContainer = connect(mapStateToProps, {
    unfollow: unFollowActionCreator,
    follow: followActionCreator,
    setIsWrote: setIsWroteActionCreator,
    setFriends: setFriendsActionCreator,
    setCurrentPage: setCurrentPageActionCreator,
    setFriendsTotalCount: setFriendsTotalCountActionCreator,
    setIsFetching: setIsFetchingActionCreator,
    setCurrentDialog: setCurrentDialogActionCreator,
    toggleFollowingProgress: toggleFollowingProgressActionCreator,
    toggleIsWroteProgress: toggleIsWroteProgressActionCreator,
})(FriendsPageService)

export default FriendsPageContainer;