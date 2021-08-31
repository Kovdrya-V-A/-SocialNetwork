import React from 'react';
import {
    addPostActionCreator, deletePostActionCreator,
    postTextChangeActionCreator,
    setPostsActionCreator,
    toggleAddPostProgressActionCreator,
    toggleDeletePostProgressActionCreator,
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
            this.props.toggleAddPostProgress(true)
            addNewPostRequest(postText)
                .then(data => {
                    this.props.addNewPost(data[0].idPost, data[0].text, data[0].dateTime);
                    this.props.toggleAddPostProgress(false)
                })
        }
    }

    onDeletePost = (idPost) => {
        this.props.toggleDeletePostProgress(true)
        deletePostRequest(idPost)
            .then(data => {
                this.props.deletePost(idPost, data.message)
                this.props.toggleDeletePostProgress(false)
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
                     addPostInProgress={this.props.profilePage.addPostInProgress}
                     deletePostInProgress={this.props.profilePage.deletePostInProgress}
            />
        )
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    addNewPost: addPostActionCreator,
    postTextChange: postTextChangeActionCreator,
    setPosts: setPostsActionCreator,
    deletePost: deletePostActionCreator,
    toggleAddPostProgress: toggleAddPostProgressActionCreator,
    toggleDeletePostProgress: toggleDeletePostProgressActionCreator
})(MyPostsService)

export default MyPostsContainer