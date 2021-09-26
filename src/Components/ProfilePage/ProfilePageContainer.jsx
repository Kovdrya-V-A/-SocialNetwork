import React from 'react';
import {connect} from "react-redux";
import ProfilePage from "./ProfilePage";
import {CheckAuthRedirect} from "../../HOC/CheckAuth.jsx";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import {setIsWrote, setProfileId} from "../../Redux/Reducers/ProfilePageReducer";


let mapStateToProps = (state) => {
    return {
        isWrote: state.profilePage.isWrote,
        currentDialogId: state.dialogsPage.currentDialogId,
        myId: state.profilePage.myId,
    }
}


class profilePageContainer extends React.Component {

    componentDidMount() {
    }

    componentWillUnmount() {
        if (this.props.isWrote) {
            this.props.setIsWrote(false)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    render() {
        const profileId = this.props.match.params.profileId
        const isMyProfile = +(this.props.match.params.profileId) === this.props.myId || !profileId
        if (this.props.isWrote && this.props.currentDialogId) {
            return <Redirect to={"/AuthUser/DialogsPage/" + this.props.currentDialogId}/>
        }
        return (
            <ProfilePage profileId={profileId}
                         isMyProfile = {isMyProfile}/>
        )
    }

}

export default compose(
    withRouter,
    connect(mapStateToProps, {setIsWrote}),
    CheckAuthRedirect,
)(profilePageContainer)
