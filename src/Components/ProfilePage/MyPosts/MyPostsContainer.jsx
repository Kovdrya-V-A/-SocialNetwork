import React from 'react';
import {
    addPostActionCreator, deletePostActionCreator,
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
        addNewPost: (idPost, text, dateTime) => {
            dispatch(addPostActionCreator(idPost, text, dateTime))
        },
        postTextChange: (text) => {
            dispatch(postTextChangeActionCreator(text))
        },
        setPosts: (postsData) => {
            dispatch(setPostsActionCreator(postsData))
        },
        deletePost: (idPost, message) => {
            dispatch(deletePostActionCreator(idPost, message))
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

    onAddNewPost = (postText) => {
        if (postText) {
            axios.post(`http://${this.props.serverLink}/addPost`, {"token": localStorage.getItem("userToken"), "postText": postText, "isDelete": false}
            )
                .then(response => {
                    this.props.addNewPost(response.data[0].idPost, response.data[0].text, response.data[0].dateTime);
                })
        }
    }

    onDeletePost = (idPost) => {
        axios.post(`http://${this.props.serverLink}/addPost`, {"token": localStorage.getItem("userToken"), "idPost": idPost, "isDelete": true}
        )
            .then(response => {
                this.props.deletePost(idPost, response.data.message)
            })
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
                     onDeletePost = {this.onDeletePost}
                     avaImg = {this.props.profilePage.profileData[0].img}
                     postText = {this.props.profilePage.newPostText}
            />
        )
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostsService)

export default MyPostsContainer