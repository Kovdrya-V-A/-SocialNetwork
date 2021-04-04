import React from 'react';
import {addPostActionCreator, postTextChangeActionCreator} from "../../../Redux/ProfilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addNewPost: () => {dispatch(addPostActionCreator())},
        postTextChange: (text) =>{dispatch(postTextChangeActionCreator(text))}
}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer