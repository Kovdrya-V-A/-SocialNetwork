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
            axios.post(`http://${this.props.serverLink}/addPost`, {
                    "token": localStorage.getItem("userToken"),
                    "postText": postText
                }
            )
                .then(response => {
                    this.props.addNewPost(response.data[0].idPost, response.data[0].text, response.data[0].dateTime);
                })
        }
    }

    onDeletePost = (idPost) => {
        axios.delete(`http://${this.props.serverLink}/deletePost`, {
                data: {
                    "token":
                        localStorage.getItem("userToken"), "idPost":
                    idPost
                }
            }
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
            <MyPosts postsData={this.props.profilePage.postsData}
                     newPostText={this.props.profilePage.newPostText}
                     onPostTextChange={this.onPostTextChange}
                     onAddNewPost={this.onAddNewPost}
                     onDeletePost={this.onDeletePost}
                     avaImg={this.props.profilePage.profileData[0].img}
                     postText={this.props.profilePage.newPostText}
                     name={this.props.profilePage.profileData[0].name}
            />
        )
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    addNewPost: addPostActionCreator,
    postTextChange: postTextChangeActionCreator,
    setPosts: setPostsActionCreator,
    deletePost: deletePostActionCreator
})(MyPostsService)

export default MyPostsContainer