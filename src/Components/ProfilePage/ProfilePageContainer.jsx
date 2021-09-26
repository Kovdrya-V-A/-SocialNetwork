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
        if (this.props.isWrote && this.props.currentDialogId) {
            return <Redirect to={"/AuthUser/DialogsPage/" + this.props.currentDialogId}/>
        }
        return (
            <ProfilePage profileId={profileId}/>
        )
    }

}

export default compose(
    withRouter,
    connect(mapStateToProps, {setIsWrote}),
    CheckAuthRedirect,
)(profilePageContainer)
