import React from 'react';
import {connect} from "react-redux";
import ProfilePage from "./ProfilePage";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
    }
}


class profilePageService extends React.Component {

    componentDidMount() {

    }


    render() {
        return (
            <ProfilePage key = {112}/>
        )
    }

}

const ProfilePageContainer = connect(mapStateToProps, {})(profilePageService)

export default ProfilePageContainer;