import React from 'react';
import {connect} from "react-redux";
import AuthorizationPage from "./AuthorizationPage";
import {
    inputLoginActionCreator,
    inputPasswordActionCreator, resetVerificationActionCreator, userVerificationActionCreator
} from "../../Redux/AuthoRegReducers/AuthorizationPageReducer";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        authorizationPage: state.authorizationPage,
        serverLink: state.authorizationPage.serverLink
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        inputLogin: (introducedLogin) => {
            dispatch(inputLoginActionCreator(introducedLogin))
        },
        inputPassword: (introducedPassword) => {
            dispatch(inputPasswordActionCreator(introducedPassword))
        },
        userVerification: (isFits) => {
            dispatch(userVerificationActionCreator(isFits))
        },

        resetVerification: () => {
            dispatch(resetVerificationActionCreator())
        }

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
                this.props.userVerification(response.data)

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

const AuthorizationPageContainer = connect(mapStateToProps, mapDispatchToProps)(AuthorizationPageService)

export default AuthorizationPageContainer

