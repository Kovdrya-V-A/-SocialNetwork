import React from 'react';
import {connect} from "react-redux";
import AuthorizationPage from "./AuthorizationPage";
import {
    toggleAuthorisationProgress, userVerificationThunkCreator
} from "../../../Redux/AuthoRegReducers/AuthorizationPageReducer";
import {Redirect} from "react-router-dom";


let mapStateToProps = (state) => {
    return {
        authorizationPage: state.authorizationPage,
        authUserId: state.authorizationPage.authUserId
    }
}


class AuthorizationPageService extends React.Component {

    showSomeError = (reason, promise) => {
        alert('Some error =(')
        this.props.toggleAuthorisationProgress(false)
    }

    componentDidMount() {
        window.addEventListener("unhandledrejection", () => this.showSomeError())
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", () => this.showSomeError())
    }

    onUserVerification = (login, password) => {
        this.props.userVerificationThunkCreator(login, password)
    }

    render() {
        if (this.props.authorizationPage.auth) {
            return <Redirect to={"/AuthUser/ProfilePage/" + this.props.authUserId}/>
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
    toggleAuthorisationProgress

})(AuthorizationPageService)

export default AuthorizationPageContainer