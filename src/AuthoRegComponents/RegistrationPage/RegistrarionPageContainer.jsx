import React from 'react';
import {connect} from "react-redux";
import {
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
        }
    }
}

class RegistrationGageService extends React.Component {

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

    onRegistrationUser = (login, password, firstName, lastName) => {
        axios.post(`http://${this.props.serverLink}/reg`, {
            "login": login,
            "firstName": firstName,
            "lastName": lastName,
            "password": password,
        },)
            .then(response => {
                console.log(response.data)
                if (response.data.itsFine) {
                    alert ("Пользователь успешно зарегистрирован")
                }
                else (
                    alert (`Пользователь не был зарегистрирован - ${response.data.error}`)
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
                onInputLogin={this.onInputLogin}
                onInputPassword={this.onInputPassword}
                onInputFirstName={this.onInputFirstName}
                onInputLastName={this.onInputLastName}
                onRegistrationUser = {this.onRegistrationUser}
            />
        )
    }
}

const RegistrationPageContainer = connect(mapStateToProps, mapDispatchToProps)(RegistrationGageService)

export default RegistrationPageContainer