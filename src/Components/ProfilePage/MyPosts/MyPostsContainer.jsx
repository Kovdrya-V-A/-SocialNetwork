import React from 'react';
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {
    addPostThunkCreator,
    deletePostThunkCreator,
    setPostsThunkCreator,

} from "../../../Redux/Reducers/ProfilePageReducer";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
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


    render() {
        return (
            <MyPosts postsData={this.props.profilePage.postsData}
                     onAddNewPost={this.onAddNewPost}
                     onDeletePost={this.onDeletePost}
                     avaImg={this.props.profilePage.profileData[0].img}
                     name={this.props.profilePage.profileData[0].name}
                     addPostInProgress={this.props.profilePage.addPostInProgress}
                     deletePostInProgress={this.props.profilePage.deletePostInProgress}
            />
        )
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    setPostsThunkCreator,
    addPostThunkCreator,
    deletePostThunkCreator
})(MyPostsService)

export default MyPostsContainer