import React from 'react';
import {connect} from "react-redux";
import {
    inputAddressActionCreator, inputAgeActionCreator, inputEmailActionCreator,
    inputFirstNameActionCreator, inputLastNameActionCreator,
    inputLoginActionCreator,
    inputPasswordActionCreator
} from "../../Redux/AuthoRegReducers/RegistrationPageReducer";
import RegistrationPage from "./RegistrationPage";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        registrationPage: state.registrationPage,
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
        inputFirstName: (introducedFirstName) => {
            dispatch(inputFirstNameActionCreator(introducedFirstName))
        },
        inputLastName: (introducedLastName) => {
            dispatch(inputLastNameActionCreator(introducedLastName))
        },
        inputAddress: (address) => {
            dispatch(inputAddressActionCreator(address))
        },
        inputAge: (age) => {
            dispatch(inputAgeActionCreator(age))
        },
        inputEmail: (email) => {
            dispatch(inputEmailActionCreator(email))
        }
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
        axios.post(`http://${this.props.serverLink}/reg`, {
            "login": login,
            "firstName": firstName,
            "lastName": lastName,
            "password": password,
            "address": address,
            "age": age,
            "email": email,
        },)
            .then(response => {
                if (response.data.itsFine) {
                    alert("Пользователь успешно зарегистрирован")
                } else (
                    alert(`Пользователь не был зарегистрирован - ${response.data.error}`)
                )
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
            />
        )
    }
}

const RegistrationPageContainer = connect(mapStateToProps, mapDispatchToProps)(RegistrationGageService)

export default RegistrationPageContainer