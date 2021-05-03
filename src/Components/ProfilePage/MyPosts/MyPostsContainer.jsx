import React from 'react';
import {
    addPostActionCreator,
    postTextChangeActionCreator,
    setPostsActionCreator
} from "../../../Redux/Reducers/ProfilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        serverLink: state.authorizationPage.serverLink
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


class MyPostsService extends React.Component {

    componentDidMount() {
        axios.get(`http://${this.props.serverLink}/posts?token=${localStorage.getItem("userToken")}`)
            .then(response => {
                if (response.data) {
                    this.props.setPosts(response.data.items)
                }
            })
    }

    onAddNewPost = (token, postText) => {
        this.props.addNewPost();
        if (postText) {
            axios.post(`http://${this.props.serverLink}/addPost`, {"token": token, "postText": postText}
            )
        }
    }



    onPostTextChange = (text) => {
        this.props.postTextChange(text)
    }

    render() {
        return (
            <MyPosts postsData = {this.props.profilePage.postsData}
                     newPostText = {this.props.profilePage.newPostText}
                     onPostTextChange = {this.onPostTextChange}
                     onAddNewPost = {this.onAddNewPost}
                     avaImg = {this.props.profilePage.profileData[0].img}
                     postText = {this.props.profilePage.newPostText}
            />
        )
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostsService)

export default MyPostsContainer