import React from 'react';
import {connect} from "react-redux";
import SelectedProfilePage from "./SelectedProfilePage";
import {
    setUserPostsActionCreator,
    setUserProfileInfoActionCreator
} from "../../Redux/Reducers/SelectedUserProfilePageReducer";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        selectedProfilePage: state.selectedProfilePage,
        serverLink: state.authorizationPage.serverLink
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setUserPosts: (postsData) => {
            dispatch(setUserPostsActionCreator(postsData))
        },

        setUserProfileInfo: (profileData) => {
            dispatch(setUserProfileInfoActionCreator(profileData))
        },

    }


}

class SelectedProfilePageService extends React.Component {

    componentDidMount() {
        let userId = window.location.pathname.split("/")
        let a = userId.length - 1
        axios.get(`http://${this.props.serverLink}/user?token=${localStorage.getItem("userToken")}&id=${userId[a]}`)
            .then(response => {
                this.props.setUserProfileInfo(response.data.userInfo)
                if (response.data.posts[0]) {
                    this.props.setUserPosts(response.data.posts)
                }
            })
    }


    render() {
        return (
            <SelectedProfilePage
                postsData={this.props.selectedProfilePage.postsData}
                profileData={this.props.selectedProfilePage.profileData}/>
        )
    }

}

const SelectedProfilePageContainer = connect(mapStateToProps, mapDispatchToProps)(SelectedProfilePageService)

export default SelectedProfilePageContainer;