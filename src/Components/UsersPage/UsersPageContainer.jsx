import React from 'react';
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setIsFetchingActionCreator,
    setIsWroteActionCreator,
    setSearchQueryTextActionCreator,
    setUsersActionCreator,
    setUserTotalCountActionCreator,
    toggleFollowingProgressActionCreator, toggleSearchUsersProgressActionCreator,
    toggleSetIsWroteProgressActionCreator,
    unFollowActionCreator
} from "../../Redux/Reducers/UsersPageReducer";
import UsersPage from "./UsersPage";
import {setCurrentDialogActionCreator} from "../../Redux/Reducers/DialogsPageReducer";
import {
    followRequest,
    getUsersRequest,
    goToDialogRequest, searchUsersRequest,
    unFollowRequest
} from "../../DAL/ApiRequests";
// import {setSelectedUserIdActionCreator} from "../../Redux/Reducers/SelectedUserProfilePageReducer";

let mapStateToProps = (state) => {
    return {
        searchQueryText: state.usersPage.searchQueryText,
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isWrote: state.usersPage.isWrote,
        serverLink: state.authorizationPage.serverLink,
        currentDialogId: state.dialogsPage.currentDialogId,
        followingInProgress: state.usersPage.followingInProgress,
        setIsWroteInProgress: state.usersPage.setIsWroteInProgress,
        searchUsersInProgress: state.usersPage.searchUsersInProgress

    }
}


class UsersPageService extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true)
        getUsersRequest(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setUserTotalCount(data.totalCount)
            })
    }

    componentWillUnmount() {
        this.props.setIsWrote(false)
    }

    onSetSearchQueryText = (enteredText) => {
        this.props.setSearchQueryText(enteredText)
    }

    onSearchUsers = (searchText) => {
        let isSearch = true;
        this.props.toggleSearchUsersProgress(true)
        searchUsersRequest(this.props.currentPage, this.props.pageSize, isSearch, searchText)
            .then(data => {
                this.props.setUsers(data.items)
                this.props.setUserTotalCount(data.totalCount)
                this.props.toggleSearchUsersProgress(false)
            })
    }

    onUnfollow = (userId) => {
        this.props.toggleFollowingProgress(true)
        unFollowRequest(userId)
            .then(data => {
                this.props.unfollow(userId, data.data.message)
                this.props.toggleFollowingProgress(false)
            })
    }

    onFollow = (userId) => {
        this.props.toggleFollowingProgress(true)
        followRequest(userId)
            .then(data => {
                this.props.follow(userId, data.message, data.error)
                this.props.toggleFollowingProgress(false)
            })
    }

    onSetCurrentPage = (number) => {
        this.props.setCurrentPage(number)
        this.props.setIsFetching(true)
        getUsersRequest(number, this.props.pageSize)
            .then(data => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setUserTotalCount(data.totalCount)
            })
    }

    onMessage = (userId) => {
        this.props.toggleSetIsWroteProgress(true)
        goToDialogRequest(userId)
            .then((data) => {
                this.props.setIsWrote(true)
                this.props.setCurrentDialog(data.idDialog)
                this.props.toggleSetIsWroteProgress(false)
            })
    }


    render() {
        return <>
            <UsersPage
                onSetSearchQueryText={this.onSetSearchQueryText}
                onSetCurrentPage={this.onSetCurrentPage}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                usersData={this.props.usersData}
                isWrote={this.props.isWrote}
                searchQueryText={this.props.searchQueryText}
                onUnfollow={this.onUnfollow}
                onFollow={this.onFollow}
                onMessage={this.onMessage}
                onSearchUsers={this.onSearchUsers}
                currentDialogId={this.props.currentDialogId}
                followingInProgress={this.props.followingInProgress}
                setIsWroteInProgress={this.props.setIsWroteInProgress}
                searchUsersInProgress={this.props.searchUsersInProgress}
            />

        </>
    }
}


const UsersPageContainer = connect(mapStateToProps, {
    follow: followActionCreator,
    unfollow: unFollowActionCreator,
    setUsers: setUsersActionCreator,
    setCurrentPage: setCurrentPageActionCreator,
    setUserTotalCount: setUserTotalCountActionCreator,
    setIsFetching: setIsFetchingActionCreator,
    setIsWrote: setIsWroteActionCreator,
    setSearchQueryText: setSearchQueryTextActionCreator,
    setCurrentDialog: setCurrentDialogActionCreator,
    toggleSetIsWroteProgress: toggleSetIsWroteProgressActionCreator,
    toggleFollowingProgress: toggleFollowingProgressActionCreator,
    toggleSearchUsersProgress: toggleSearchUsersProgressActionCreator
})(UsersPageService)

export default UsersPageContainer;