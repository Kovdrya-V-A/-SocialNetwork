import React from 'react';
import {connect} from "react-redux";
import FriendsPage from "./FriendsPage";

let mapStateToProps = (state) => {
    return {
        friendsPage: state.friendsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {}
}

const FriendsPageContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsPage)

export default FriendsPageContainer;



