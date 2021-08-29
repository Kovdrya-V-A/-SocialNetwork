import React from 'react';
import {
    addPostActionCreator, deletePostActionCreator,
    postTextChangeActionCreator,
    setPostsActionCreator
} from "../../../Redux/Reducers/ProfilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addNewPostRequest, deletePostRequest, getMyPostsRequest} from "../../../DAL/ApiRequests";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        serverLink: state.authorizationPage.serverLink
    }
}


class MyPostsService extends React.Component {

    componentDidMount() {
        getMyPostsRequest()
            .then(data => {
                if (data) {
                    this.props.setPosts(data.items)
                }
            })
    }

    onAddNewPost = (postText) => {
        if (postText) {
            addNewPostRequest(postText)
                .then(data => {
                    this.props.addNewPost(data[0].idPost, data[0].text, data[0].dateTime);
                })
        }
    }

    onDeletePost = (idPost) => {
        deletePostRequest (idPost)
            .then(data => {
                this.props.deletePost(idPost, data.message)
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