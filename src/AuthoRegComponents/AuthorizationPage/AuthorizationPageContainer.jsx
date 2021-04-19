import React from 'react';
import {connect} from "react-redux";
import AuthorizationPage from "./AuthorizationPage";
import {
    inputLoginActionCreator,
    inputPasswordActionCreator, userVerificationActionCreator
} from "../../Redux/AuthoRegReducers/AuthorizationPageReducer";


let mapStateToProps = (state) => {
    return {
        authorizationPage: state.authorizationPage
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
        }
    }
}


class AuthorizationPageService extends React.Component {

    onInputLogin = (enterLogin) => {
        this.props.inputLogin(enterLogin)
    }

    onInputPassword = (enterPassword) => {
        this.props.inputPassword(enterPassword)
    }

    onUserVerification = (isFits) => {
        this.props.userVerification(isFits)
    }

    render() {
        return (
            <AuthorizationPage
                introducedLogin={this.props.authorizationPage.introducedLogin}
                introducedPassword={this.props.authorizationPage.introducedPassword}
                dataIsCorrect = {this.props.dataIsCorrect}
                onInputLogin={this.onInputLogin}
                onInputPassword={this.onInputPassword}
                onUserVerification = {this.onUserVerification}/>
        )
    }
}

const AuthorizationPageContainer = connect(mapStateToProps, mapDispatchToProps)(AuthorizationPageService)

export default AuthorizationPageContainer

