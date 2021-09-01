import React from 'react';
import {connect} from "react-redux";
import {
    inputAddressActionCreator, inputAgeActionCreator, inputEmailActionCreator,
    inputFirstNameActionCreator, inputLastNameActionCreator,
    inputLoginActionCreator,
    inputPasswordActionCreator, toggleRegistrationProgressActionCreator
} from "../../../Redux/AuthoRegReducers/RegistrationPageReducer";
import RegistrationPage from "./RegistrationPage";
import {userRegistrationRequest} from "../../../DAL/ApiRequests";


let mapStateToProps = (state) => {
    return {
        registrationPage: state.registrationPage,
        serverLink: state.authorizationPage.serverLink
    }
}


class RegistrationGageService extends React.Component {

    onInputEmail = (email) => {
        this.props.inputEmail(email)
    }

    onInputAddress = (address) => {
        this.props.inputAddress(address)
    }

    onInputAge = (age) => {
        this.props.inputAge(age)
    }

    onInputLogin = (enterLogin) => {
        this.props.inputLogin(enterLogin)
    }

    onInputPassword = (enterPassword) => {
        this.props.inputPassword(enterPassword)
    }

    onInputFirstName = (enterFirstName) => {
        this.props.inputFirstName(enterFirstName)
    }

    onInputLastName = (enterLastName) => {
        this.props.inputLastName(enterLastName)
    }


    onRegistrationUser = (login, password, firstName, lastName, address, age, email) => {
        this.props.toggleRegistrationProgress(true)
        userRegistrationRequest(login, firstName, lastName, password, address, age, email)
            .then(data => {
                if (data.itsFine) {
                    alert("Пользователь успешно зарегистрирован")
                } else (
                    alert(`Пользователь не был зарегистрирован - ${data.error}`)
                )
                this.props.toggleRegistrationProgress(false)
            })
    }

    render() {
        return (
            <RegistrationPage
                introducedLogin={this.props.registrationPage.introducedLogin}
                introducedPassword={this.props.registrationPage.introducedPassword}
                introducedFirstName={this.props.registrationPage.introducedFirstName}
                introducedLastName={this.props.registrationPage.introducedLastName}
                introducedAddress={this.props.registrationPage.introducedAddress}
                introducedAge={this.props.registrationPage.introducedAge}
                introducedEmail={this.props.registrationPage.introducedEmail}
                onInputLogin={this.onInputLogin}
                onInputPassword={this.onInputPassword}
                onInputFirstName={this.onInputFirstName}
                onInputLastName={this.onInputLastName}
                onRegistrationUser={this.onRegistrationUser}
                onInputAddress={this.onInputAddress}
                onInputAge={this.onInputAge}
                onInputEmail={this.onInputEmail}
                registrationInProgress = {this.props.registrationPage.registrationInProgress}
            />
        )
    }
}

const RegistrationPageContainer = connect(mapStateToProps, {
    inputLogin: inputLoginActionCreator,
    inputPassword: inputPasswordActionCreator,
    inputFirstName: inputFirstNameActionCreator,
    inputLastName: inputLastNameActionCreator,
    inputAddress: inputAddressActionCreator,
    inputAge: inputAgeActionCreator,
    inputEmail: inputEmailActionCreator,
    toggleRegistrationProgress: toggleRegistrationProgressActionCreator,

})(RegistrationGageService)

export default RegistrationPageContainer