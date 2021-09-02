import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator, goToDialogThunkCreator, searchUsersThunkCreator,
    setCurrentPageThunkCreator,
    setIsWrote,
    setSearchQueryText,
    setUsersThunkCreator,
    toggleFollowingProgress,
    toggleSearchUsersProgress,
    toggleSetIsWroteProgress,
    unFollowThunkCreator,

} from "../../Redux/Reducers/UsersPageReducer";
import UsersPage from "./UsersPage";

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
        searchUsersInProgress: state.usersPage.searchUsersInProgress,

    }
}


class UsersPageService extends React.Component {

    componentDidMount() {
        this.props.setUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    componentWillUnmount() {
        this.props.setIsWrote(false)
    }

    onSetSearchQueryText = (enteredText) => {
        this.props.setSearchQueryText(enteredText)
    }

    onSearchUsers = (searchText) => {
        this.props.searchUsersThunkCreator(this.props.currentPage, this.props.pageSize, searchText)
    }

    onUnfollow = (userId) => {
        this.props.unFollowThunkCreator(userId)
    }

    onFollow = (userId) => {
        this.props.followThunkCreator(userId)
    }

    onSetCurrentPage = (number) => {
        this.props.setCurrentPageThunkCreator(number, this.props.pageSize)
    }

    onMessage = (userId) => {
        this.props.goToDialogThunkCreator(userId)
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
    setIsWrote,
    setSearchQueryText,
    toggleSetIsWroteProgress,
    toggleFollowingProgress,
    toggleSearchUsersProgress,
    setUsersThunkCreator,
    searchUsersThunkCreator,
    unFollowThunkCreator,
    followThunkCreator,
    setCurrentPageThunkCreator,
    goToDialogThunkCreator,
})(UsersPageService)

export default UsersPageContainer;