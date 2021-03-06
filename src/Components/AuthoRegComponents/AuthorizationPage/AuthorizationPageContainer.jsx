import React from 'react';
import {connect} from "react-redux";
import AuthorizationPage from "./AuthorizationPage";
import {userVerificationThunkCreator
} from "../../../Redux/AuthoRegReducers/AuthorizationPageReducer";
import {Redirect} from "react-router-dom";


let mapStateToProps = (state) => {
    return {
        authorizationPage: state.authorizationPage,
    }
}


class AuthorizationPageService extends React.Component {

    onUserVerification = (login, password) => {
        this.props.userVerificationThunkCreator(login, password)
    }

    render() {
        if (this.props.authorizationPage.auth) {
            return <Redirect to="/AuthUser/ProfilePage"/>
        }
        return (
            <AuthorizationPage
                onUserVerification={this.onUserVerification}
                authorisationInProgress={this.props.authorizationPage.authorisationInProgress}
            />
        )
    }
}

const AuthorizationPageContainer = connect(mapStateToProps, {
    userVerificationThunkCreator,

})(AuthorizationPageService)

export default AuthorizationPageContainer