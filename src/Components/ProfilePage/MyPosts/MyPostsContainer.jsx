import React from 'react';
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {
    addPostThunkCreator,
    deletePostThunkCreator,
    postTextChange,
    setPostsThunkCreator,

} from "../../../Redux/Reducers/ProfilePageReducer";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        serverLink: state.authorizationPage.serverLink
    }
}


class MyPostsService extends React.Component {

    componentDidMount() {
        this.props.setPostsThunkCreator()

    }

    onAddNewPost = (postText) => {
        if (postText) {
            this.props.addPostThunkCreator(postText)
        }
    }

    onDeletePost = (idPost) => {
        this.props.deletePostThunkCreator(idPost)
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
    postTextChange,
    setPostsThunkCreator,
    addPostThunkCreator,
    deletePostThunkCreator
})(MyPostsService)

export default MyPostsContainer