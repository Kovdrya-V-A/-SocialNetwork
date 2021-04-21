import React from 'react';
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setUsersActionCreator,
    unFollowActionCreator
} from "../../Redux/Reducers/UsersPageReducer";
import * as axios from "axios";
import UsersPage from "./UsersPage";

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
        }
    }
}


class UsersPageService extends React.Component {

    componentDidMount() {

        if (this.props.usersData.length === 0) {
            axios.get(`http://188.32.105.146:404/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUsers(response.data.items)
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
        axios.get(`http://188.32.105.146:404/users?page=${number}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }


    render() {
        return (
            <UsersPage onSetCurrentPage={this.onSetCurrentPage}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       usersData={this.props.usersData}
                       onUnfollow={this.onUnfollow}
                       onFollow={this.onFollow}/>
        )
    }
}


const UsersPageContainer = connect(mapStateToProps, mapDispatchToProps)(UsersPageService)

export default UsersPageContainer;



