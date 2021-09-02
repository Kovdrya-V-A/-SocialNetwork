import React from 'react';
import {connect} from "react-redux";
import FriendsPage from "./FriendsPage";
import {
    followThunkActionCreator, goToDialogThunkActionCreator,
    setCurrentPage, setCurrentPageThunkActionCreator,
    setFriendsThunkCreator,
    setIsWrote,
    unFollowThunkActionCreator
} from "../../Redux/Reducers/FriendsPageReducer";

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

        this.props.setFriendsThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    componentWillUnmount() {
        this.props.setIsWrote(false)
        this.props.setCurrentPage(1)
    }

    onUnfollow = (userId) => {
        this.props.unFollowThunkActionCreator(userId)
    }

    onFollow = (userId) => {
        this.props.followThunkActionCreator(userId)
    }

    onSetCurrentPage = (number) => {
        this.props.setCurrentPageThunkActionCreator(number, this.props.pageSize)
    }

    onMessage = (userId) => {
        this.props.goToDialogThunkActionCreator(userId)
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
    setIsWrote,
    setCurrentPage,
    setFriendsThunkCreator,
    unFollowThunkActionCreator,
    followThunkActionCreator,
    setCurrentPageThunkActionCreator,
    goToDialogThunkActionCreator
})(FriendsPageService)

export default FriendsPageContainer;