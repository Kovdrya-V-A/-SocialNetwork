import React from 'react';
import {connect} from "react-redux";
import AuthorizationPage from "./AuthorizationPage";
import {
    inputLoginActionCreator,
    inputPasswordActionCreator, resetVerificationActionCreator, setUserTokenActionCreator, userVerificationActionCreator
} from "../../../Redux/AuthoRegReducers/AuthorizationPageReducer";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        authorizationPage: state.authorizationPage,
        serverLink: state.authorizationPage.serverLink
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
        axios.post(`http://${this.props.serverLink}/auth`, {"login": login, "password": password})
            .then(response => {
                if (response.data.key_type) {
                    this.props.setToken(response.data.access_token)
                }
                this.props.userVerification(response.data.key_type)
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
            />
        )
    }
}

const AuthorizationPageContainer = connect(mapStateToProps, {
    setToken: setUserTokenActionCreator,
    inputLogin: inputLoginActionCreator,
    inputPassword:inputPasswordActionCreator,
    userVerification: userVerificationActionCreator,
    resetVerification:resetVerificationActionCreator

})(AuthorizationPageService)

export default AuthorizationPageContainer