import React from 'react';
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator, setIsFetchingActionCreator,
    setUsersActionCreator, setUserTotalCountActionCreator,
    unFollowActionCreator
} from "../../Redux/Reducers/UsersPageReducer";
import * as axios from "axios";
import UsersPage from "./UsersPage";
import {setSelectedUserIdActionCreator} from "../../Redux/Reducers/SelectedUserProfilePageReducer";

let mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        serverLink: state.authorizationPage.serverLink
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unFollowActionCreator(userId))
        },
        setUsers: (usersData) => {
            dispatch(setUsersActionCreator(usersData))
        },
        setCurrentPage: (number) => {
            dispatch(setCurrentPageActionCreator(number))
        },
        setUserTotalCount: (count) => {
            dispatch(setUserTotalCountActionCreator(count))
        },
        setIsFetching: (isFetch) => {
            dispatch(setIsFetchingActionCreator(isFetch))
        },
    }
}


class UsersPageService extends React.Component {

    componentDidMount() {

        if (this.props.usersData.length === 0) {
            this.props.setIsFetching(true)
            axios.get(`http://${this.props.serverLink}/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setIsFetching(false)
                    this.props.setUsers(response.data.items)
                    this.props.setUserTotalCount(response.data.totalCount)
                })
        }
    }

    onUnfollow = (userId) => {
        this.props.unfollow(userId)
    }

    onFollow = (userId) => {
        this.props.follow(userId)
    }

    onSetCurrentPage = (number) => {
        this.props.setCurrentPage(number)
        this.props.setIsFetching(true)
        axios.get(`http://${this.props.serverLink}/users?page=${number}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUserTotalCount(response.data.totalCount)
            })
    }

    onsetSelectedUserId = (userId) => {
        this.props.setSelectedUserId(userId)
    }


    render() {
        return <>
            <UsersPage onSetCurrentPage={this.onSetCurrentPage}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       usersData={this.props.usersData}
                       onUnfollow={this.onUnfollow}
                       onFollow={this.onFollow}
            />

        </>
    }
}


const UsersPageContainer = connect(mapStateToProps, mapDispatchToProps)(UsersPageService)

export default UsersPageContainer;