import React from 'react';
import {connect} from "react-redux";
import * as axios from "axios";
import FriendsPage from "./FriendsPage";
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setFriendsActionCreator, setFriendsTotalCountActionCreator, setIsFetchingActionCreator, setIsWroteActionCreator,
    unFollowActionCreator
} from "../../Redux/Reducers/FriendsPageReducer";
import {setCurrentDialogActionCreator} from "../../Redux/Reducers/DialogsPageReducer";

let mapStateToProps = (state) => {
    return {
        friendsData: state.friendsPage.friendsData,
        pageSize: state.friendsPage.pageSize,
        totalFriendsCount: state.friendsPage.totalFriendsCount,
        currentPage: state.friendsPage.currentPage,
        isFetching: state.friendsPage.isFetching,
        isWrote: state.friendsPage.isWrote,
        serverLink: state.authorizationPage.serverLink,
        currentDialogId: state.dialogsPage.currentDialogId
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
        this.props.setCurrentPage(1)
    }

    onUnfollow = (userId) => {
        axios.post(`http://${this.props.serverLink}/followFriend`,
            {
                "token": localStorage.getItem("userToken"),
                "userId": userId,
                "follow": false

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
                "follow": true

            })
            .then(response => {
                console.log(response)
                this.props.follow(userId, response.data.message)
            })
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
            .then((response) => {
                this.props.setIsWrote(true)
                this.props.setCurrentDialog(response.data.idDialog)
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
            />

        </>
    }
}


const FriendsPageContainer = connect(mapStateToProps, {
    unfollow: unFollowActionCreator,
    follow: followActionCreator,
    setIsWrote: setIsWroteActionCreator,
    setFriends:setFriendsActionCreator,
    setCurrentPage:setCurrentPageActionCreator,
    setFriendsTotalCount:setFriendsTotalCountActionCreator,
    setIsFetching: setIsFetchingActionCreator,
    setCurrentDialog:setCurrentDialogActionCreator
})(FriendsPageService)

export default FriendsPageContainer;