import React from 'react';
import {connect} from "react-redux";
import ProfilePage from "./ProfilePage";
import {CheckAuthRedirect} from "../../HOC/CheckAuth.jsx";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
    }
}


class profilePageContainer extends React.Component {

    componentDidMount() {

    }


    render() {
        return (
            <ProfilePage key = {112}/>
        )
    }

}

export default compose(
    connect(mapStateToProps, {}),
    CheckAuthRedirect
)(profilePageContainer)
