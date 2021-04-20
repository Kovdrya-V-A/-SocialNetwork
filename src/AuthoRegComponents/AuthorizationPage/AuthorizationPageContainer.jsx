import React from 'react';
import {connect} from "react-redux";
import AuthorizationPage from "./AuthorizationPage";
import {
    changeLinkActionCreator,
    inputLoginActionCreator,
    inputPasswordActionCreator, userVerificationActionCreator
} from "../../Redux/AuthoRegReducers/AuthorizationPageReducer";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        authorizationPage: state.authorizationPage,
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

        changeStartLink: (link) => {
            dispatch(changeLinkActionCreator(link))
        }
    }
}


class AuthorizationPageService extends React.Component {

    onChangeStartLink = (link) => {
        this.props.changeStartLink(link)
    }

    onInputLogin = (enterLogin) => {
        this.props.inputLogin(enterLogin)
    }

    onInputPassword = (enterPassword) => {
        this.props.inputPassword(enterPassword)
    }


    onUserVerification = (login, password) => {
        axios.post(`http://188.32.105.146:404/auth`, {"login": login, "password": password})
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
                onChangeStartLink ={this.onChangeStartLink}
                onInputLogin={this.onInputLogin}
                onInputPassword={this.onInputPassword}
                onUserVerification={this.onUserVerification}/>
        )
    }
}

const AuthorizationPageContainer = connect(mapStateToProps, mapDispatchToProps)(AuthorizationPageService)

export default AuthorizationPageContainer

