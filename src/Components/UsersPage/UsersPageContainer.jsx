import React from 'react';
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator, setIsFetchingActionCreator, setIsWroteActionCreator,
    setUsersActionCreator, setUserTotalCountActionCreator,
    unFollowActionCreator
} from "../../Redux/Reducers/UsersPageReducer";
import * as axios from "axios";
import UsersPage from "./UsersPage";
// import {setSelectedUserIdActionCreator} from "../../Redux/Reducers/SelectedUserProfilePageReducer";

let mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isWrote: state.usersPage.isWrote,
        serverLink: state.authorizationPage.serverLink
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId, message) => {
            dispatch(followActionCreator(userId, message))
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
        setIsWrote: (isWrote) => {
            dispatch(setIsWroteActionCreator(isWrote))
        }
    }
}


class UsersPageService extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`http://${this.props.serverLink}/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUserTotalCount(response.data.totalCount)
            })
    }

    componentWillUnmount() {
        this.props.setIsWrote(false)
    }

    onUnfollow = (userId) => {
        this.props.unfollow(userId)
    }

    onFollow = (userId) => {
        axios.post(`http://${this.props.serverLink}/followFriend`,
            {
                "token": localStorage.getItem("userToken"),
                "userId": userId

            })
            .then(response => {
                console.log(response)
                this.props.follow(userId, response.data.message)
            })
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

    onMessage = (userId) => {
        axios.post(`http://${this.props.serverLink}/createDialog`, {
            "token": localStorage.getItem("userToken"),
            "userId": userId
        })
            .then(() => {
                this.props.setIsWrote(true)
            })
    }

    // onsetSelectedUserId = (userId) => {
    //     this.props.setSelectedUserId(userId)
    // }


    render() {
        return <>
            <UsersPage onSetCurrentPage={this.onSetCurrentPage}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       usersData={this.props.usersData}
                       isWrote={this.props.isWrote}
                       onUnfollow={this.onUnfollow}
                       onFollow={this.onFollow}
                       onMessage={this.onMessage}
            />

        </>
    }
}


const UsersPageContainer = connect(mapStateToProps, mapDispatchToProps)(UsersPageService)

export default UsersPageContainer;