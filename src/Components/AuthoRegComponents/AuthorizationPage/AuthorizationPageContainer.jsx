import React from 'react';
import {connect} from "react-redux";
import AuthorizationPage from "./AuthorizationPage";
import {
    inputLoginActionCreator,
    inputPasswordActionCreator,
    resetVerificationActionCreator,
    setUserTokenActionCreator,
    toggleAuthorisationProgressActionCreator,
    userVerificationActionCreator
} from "../../../Redux/AuthoRegReducers/AuthorizationPageReducer";
import {userVerificationRequest} from "../../../DAL/ApiRequests";


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
        this.props.toggleAuthorisationProgress(true)
        userVerificationRequest(login, password)
            .then(data => {
                if (data.key_type) {
                    this.props.setToken(data.access_token)
                }
                this.props.userVerification(data.key_type)
                this.props.toggleAuthorisationProgress(false)
            })
    }

    render() {
        return (
            <AuthorizationPage
                introducedLogin={this.props.authorizationPage.introducedLogin}
                introducedPassword={this.props.authorizationPage.introducedPassword}
                dataIsCorrect={this.props.authorizationPage.dataIsCorrect}
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
    setToken: setUserTokenActionCreator,
    inputLogin: inputLoginActionCreator,
    inputPassword: inputPasswordActionCreator,
    userVerification: userVerificationActionCreator,
    resetVerification: resetVerificationActionCreator,
    toggleAuthorisationProgress: toggleAuthorisationProgressActionCreator,

})(AuthorizationPageService)

export default AuthorizationPageContainer