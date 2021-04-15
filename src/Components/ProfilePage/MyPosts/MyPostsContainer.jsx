import React from 'react';
import {
    addPostActionCreator,
    postTextChangeActionCreator,
    setPostsActionCreator
} from "../../../Redux/ProfilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addNewPost: () => {
            dispatch(addPostActionCreator())
        },
        postTextChange: (text) => {
            dispatch(postTextChangeActionCreator(text))
        },
        setPosts: (postsData) => {
            dispatch(setPostsActionCreator(postsData))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer