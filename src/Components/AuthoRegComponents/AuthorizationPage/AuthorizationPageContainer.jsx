import React from 'react';
import {connect} from "react-redux";
import AuthorizationPage from "./AuthorizationPage";
import {userVerificationRequest} from "../../../DAL/ApiRequests";
import {
    inputLogin,
    inputPassword, resetVerification,
    setUserToken, toggleAuthorisationProgress,
    userVerification, userVerificationThunkCreator
} from "../../../Redux/AuthoRegReducers/AuthorizationPageReducer";


let mapStateToProps = (state) => {
    return {
        authorizationPage: state.authorizationPage,
    }
}


class AuthorizationPageService extends React.Component {

    onResetVerification = () => {
        this.props.resetVerification()
    }

    onInputLogin = (enterLogin) => {
        this.props.inputLogin(enterLogin)
    }

    onInputPassword = (enterPassword) => {
        this.props.inputPassword(enterPassword)
    }


    onUserVerification = (login, password) => {
        this.props.userVerificationThunkCreator(login, password)
    }

    render() {
        return (
            <AuthorizationPage
                introducedLogin={this.props.authorizationPage.introducedLogin}
                introducedPassword={this.props.authorizationPage.introducedPassword}
                auth={this.props.authorizationPage.auth}
                onInputLogin={this.onInputLogin}
                onInputPassword={this.onInputPassword}
                onUserVerification={this.onUserVerification}
                onResetVerification={this.onResetVerification}
                authorisationInProgress={this.props.authorizationPage.authorisationInProgress}
            />
        )
    }
}

const AuthorizationPageContainer = connect(mapStateToProps, {
    setUserToken,
    inputLogin,
    inputPassword,
    userVerification,
    resetVerification,
    toggleAuthorisationProgress,
    userVerificationThunkCreator,

})(AuthorizationPageService)

export default AuthorizationPageContainer