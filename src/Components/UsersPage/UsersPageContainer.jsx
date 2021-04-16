import React from 'react';
import {connect} from "react-redux";
import UsersPage from "./UsersPage";
import {
    followActionCreator, setCurrentPageActionCreator,
    setUsersActionCreator,
    unFollowActionCreator
} from "../../Redux/UsersPageReducer";

let mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {dispatch(followActionCreator(userId))},
        unfollow: (userId) => {dispatch(unFollowActionCreator(userId))},
        setUsers: (usersData) => {dispatch(setUsersActionCreator(usersData))},
        setCurrentPage: (number) => {
            dispatch(setCurrentPageActionCreator(number))
        }
    }
}

const UsersPageContainer = connect(mapStateToProps, mapDispatchToProps)(UsersPage)

export default UsersPageContainer;



