import React from 'react';
import {connect} from "react-redux";
import ProfilePage from "./ProfilePage";
import {CheckAuthRedirect} from "../../HOC/CheckAuth.jsx";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {setProfileId} from "../../Redux/Reducers/ProfilePageReducer";


let mapStateToProps = (state) => {
    return {
        profileId: state.profilePage.profileId
    }
}


class profilePageContainer extends React.Component {


    componentDidMount() {
        this.props.setProfileId(this.props.match.params.profileId || null)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.profileId !== null ) {
            this.props.setProfileId(this.props.match.params.profileId || null)
        }
    }



    render() {
        const profileId = this.props.match.params.profileId
        return (
            <ProfilePage profileId = {profileId || null}/>
        )
    }

}

export default compose(
    withRouter,
    connect(mapStateToProps, {setProfileId}),
    CheckAuthRedirect,
)(profilePageContainer)
