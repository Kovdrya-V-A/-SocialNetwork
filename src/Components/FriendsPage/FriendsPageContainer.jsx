import React from 'react';
import {connect} from "react-redux";
import * as axios from "axios";
import FriendsPage from "./FriendsPage";
import {
    setCurrentPageActionCreator,
    setFriendsActionCreator, setFriendsTotalCountActionCreator, setIsFetchingActionCreator, setIsWroteActionCreator,
    unFollowActionCreator
} from "../../Redux/Reducers/FriendsPageReducer";
// import {setSelectedUserIdActionCreator} from "../../Redux/Reducers/SelectedUserProfilePageReducer";

let mapStateToProps = (state) => {
    return {
        friendsData: state.friendsPage.friendsData,
        pageSize: state.friendsPage.pageSize,
        totalFriendsCount: state.friendsPage.totalFriendsCount,
        currentPage: state.friendsPage.currentPage,
        isFetching: state.friendsPage.isFetching,
        isWrote: state.friendsPage.isWrote,
        serverLink: state.authorizationPage.serverLink
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        unfollow: (userId) => {
            dispatch(unFollowActionCreator(userId))
        },
        setFriends: (friendsData) => {
            dispatch(setFriendsActionCreator(friendsData))
        },
        setCurrentPage: (number) => {
            dispatch(setCurrentPageActionCreator(number))
        },
        setFriendsTotalCount: (count) => {
            dispatch(setFriendsTotalCountActionCreator(count))
        },
        setIsFetching: (isFetch) => {
            dispatch(setIsFetchingActionCreator(isFetch))
        },
        setIsWrote: (isWrote) => {
            dispatch(setIsWroteActionCreator(isWrote))
        }
    }
}


class FriendsPageService extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`http://${this.props.serverLink}/friends?token=${localStorage.getItem("userToken")}&page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)
                if (response.data) {
                    this.props.setFriends(response.data.items)
                    this.props.setFriendsTotalCount(response.data.totalCount)
                }
            })
    }

    componentWillUnmount() {
        this.props.setIsWrote(false)
    }

    onUnfollow = (userId) => {
        this.props.unfollow(userId)
    }

    onSetCurrentPage = (number) => {
        this.props.setCurrentPage(number)
        this.props.setIsFetching(true)
        axios.get(`http://${this.props.serverLink}/friends?token=${localStorage.getItem("userToken")}&page=${number}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setFriends(response.data.items)
                this.props.setFriendsTotalCount(response.data.totalCount)
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
            <FriendsPage onSetCurrentPage={this.onSetCurrentPage}
                         totalFriendsCount={this.props.totalFriendsCount}
                         pageSize={this.props.pageSize}
                         currentPage={this.props.currentPage}
                         friendsData={this.props.friendsData}
                         isWrote={this.props.isWrote}
                         onUnfollow={this.onUnfollow}
                         onMessage={this.onMessage}
            />

        </>
    }
}


const FriendsPageContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsPageService)

export default FriendsPageContainer;