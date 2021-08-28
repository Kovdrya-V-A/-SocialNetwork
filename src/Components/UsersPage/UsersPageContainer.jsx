import React from 'react';
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator, setIsFetchingActionCreator, setIsWroteActionCreator, setSearchQueryTextActionCreator,
    setUsersActionCreator, setUserTotalCountActionCreator,
    unFollowActionCreator
} from "../../Redux/Reducers/UsersPageReducer";
import * as axios from "axios";
import UsersPage from "./UsersPage";
import {setCurrentDialogActionCreator} from "../../Redux/Reducers/DialogsPageReducer";
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
        currentDialogId: state.dialogsPage.currentDialogId

    }
}


class UsersPageService extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`http://${this.props.serverLink}/users?token=${localStorage.getItem("userToken")}&page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUserTotalCount(response.data.totalCount)
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
        axios.get(`http://${this.props.serverLink}/users?token=${localStorage.getItem("userToken")}&page=${this.props.currentPage}&count=${this.props.pageSize}&isSearch=${isSearch}&searchText=${searchText}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setUserTotalCount(response.data.totalCount)
            })
    }

    onUnfollow = (userId) => {
        axios.delete(`http://${this.props.serverLink}/unFollowFriend`,
            {
                data: {
                    "token": localStorage.getItem("userToken"),
                    "userId": userId,
                }

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

            })
            .then(response => {
                this.props.follow(userId, response.data.message, response.data.error)
            })
    }

    onSetCurrentPage = (number) => {
        this.props.setCurrentPage(number)
        this.props.setIsFetching(true)
        axios.get(`http://${this.props.serverLink}/users?token=${localStorage.getItem("userToken")}&page=${number}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUserTotalCount(response.data.totalCount)
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
    setCurrentDialog: setCurrentDialogActionCreator
})(UsersPageService)

export default UsersPageContainer;