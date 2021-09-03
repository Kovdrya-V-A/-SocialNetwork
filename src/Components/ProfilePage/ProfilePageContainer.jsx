import React from 'react';
import {connect} from "react-redux";
import ProfilePage from "./ProfilePage";
import {CheckAuthRedirect} from "../../HOC/CheckAuth.jsx";


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

let CheckAuthProfilePage = CheckAuthRedirect(profilePageService)

const ProfilePageContainer = connect(mapStateToProps, {})(CheckAuthProfilePage)

export default ProfilePageContainer;