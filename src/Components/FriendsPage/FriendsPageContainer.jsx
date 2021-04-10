import React from 'react';
import {connect} from "react-redux";
import FriendsPage from "./FriendsPage";
import {followActionCreator, setFriendsActionCreator, unFollowActionCreator} from "../../Redux/FriendsPageReducer";

let mapStateToProps = (state) => {
    return {
        friendsData: state.friendsPage.friendsData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {dispatch(followActionCreator(userId))},
        unfollow: (userId) => {dispatch(unFollowActionCreator(userId))},
        setFriends: (friendsData) => {dispatch(setFriendsActionCreator(friendsData))}
    }
}

const FriendsPageContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsPage)

export default FriendsPageContainer;



