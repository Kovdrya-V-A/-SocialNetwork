import React from 'react';
import {connect} from "react-redux";
import ProfilePage from "./ProfilePage";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {}


}


class profilePageService extends React.Component {

    componentDidMount() {

    }


    render() {
        return (
            <ProfilePage/>
        )
    }

}

const ProfilePageContainer = connect(mapStateToProps, mapDispatchToProps)(profilePageService)

export default ProfilePageContainer;