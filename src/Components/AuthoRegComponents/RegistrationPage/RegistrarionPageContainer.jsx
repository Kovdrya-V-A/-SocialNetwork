import React from 'react';
import {connect} from "react-redux";
import RegistrationPage from "./RegistrationPage";
import {
    registrationUserThunkCreator,
}
    from "../../../Redux/AuthoRegReducers/RegistrationPageReducer";


let mapStateToProps = (state) => {
    return {
        registrationPage: state.registrationPage,
    }
}

class RegistrationGageService extends React.Component {

    onRegistrationUser = (login, password, firstName, lastName, address, age, email) => {
        this.props.registrationUserThunkCreator(login, password, firstName, lastName, address, age, email)
    }


    render() {
        return (
            <RegistrationPage
                onRegistrationUser = {this.onRegistrationUser}
                registrationInProgress = {this.props.registrationPage.registrationInProgress}
            />
        )
    }
}

const RegistrationPageContainer = connect(mapStateToProps, {
    registrationUserThunkCreator,
})(RegistrationGageService)

export default RegistrationPageContainer