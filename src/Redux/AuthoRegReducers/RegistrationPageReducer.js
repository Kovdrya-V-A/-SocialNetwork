import {userRegistrationRequest} from "../../DAL/ApiRequests";

const INPUT_LOGIN_STATE = "INPUT_LOGIN_STATE";
const INPUT_PASSWORD_STATE = "INPUT_PASSWORD_STATE";
const INPUT_FIRST_NAME_STATE = "INPUT_FIRST_NAME_STATE";
const INPUT_LAST_NAME_STATE = "INPUT_LAST_NAME_STATE";
const INPUT_ADDRESS_STATE = "INPUT_ADDRESS_STATE";
const INPUT_AGE = "INPUT_AGE";
const INPUT_EMAIL = "INPUT_EMAIL";
const TOGGLE_REGISTRATION_PROGRESS = "TOGGLE_REGISTRATION_PROGRESS";

let initialRegistrationPage = {
    introducedLogin: "",
    introducedPassword: "",
    introducedFirstName: "",
    introducedLastName: "",
    introducedAddress: "",
    introducedAge: "",
    introducedEmail: "",
    registrationInProgress: false,
};

const registrationPageReducer = (registrationPage = initialRegistrationPage, action) => {
    switch (action.type) {
        case INPUT_LOGIN_STATE:

            return {
                ...registrationPage,
                introducedLogin: action.introducedLogin
            }

        case INPUT_PASSWORD_STATE:

            return {
                ...registrationPage,
                introducedPassword: action.introducedPassword
            }

        case INPUT_FIRST_NAME_STATE:
            return {
                ...registrationPage,
                introducedFirstName: action.introducedFirstName
            }

        case INPUT_LAST_NAME_STATE:
            return {
                ...registrationPage,
                introducedLastName: action.introducedLastName
            }

        case INPUT_ADDRESS_STATE:
            return {
                ...registrationPage,
                introducedAddress: action.introducedAddress
            }
        case INPUT_AGE :
            return {
                ...registrationPage,
                introducedAge: action.introducedAge
            }

        case INPUT_EMAIL:
            return {
                ...registrationPage,
                introducedEmail: action.introducedEmail
            }
        case TOGGLE_REGISTRATION_PROGRESS:
            return {
                ...registrationPage,
                registrationInProgress: action.registrationInProgress
            }

        default: {
            return registrationPage
        }
    }
}


export const inputLogin = (login) => {
    return {
        type: INPUT_LOGIN_STATE,
        introducedLogin: login.current.value
    }
}
export const toggleRegistrationProgress = (registrationInProgress) => {
    return {
        type: TOGGLE_REGISTRATION_PROGRESS,
        registrationInProgress: registrationInProgress
    }
}

export const inputPassword = (password) => {
    return {
        type: INPUT_PASSWORD_STATE,
        introducedPassword: password.current.value
    }
}

export const inputFirstName = (firstName) => {
    return {
        type: INPUT_FIRST_NAME_STATE,
        introducedFirstName: firstName.current.value
    }
}

export const inputLastName = (lastName) => {
    return {
        type: INPUT_LAST_NAME_STATE,
        introducedLastName: lastName.current.value
    }
}
export const inputAddress = (address) => {
    return {
        type: INPUT_ADDRESS_STATE,
        introducedAddress: address.current.value
    }
}
export const inputAge = (age) => {
    return {
        type: INPUT_AGE,
        introducedAge: age.current.value
    }
}
export const inputEmail = (email) => {
    return {
        type: INPUT_EMAIL,
        introducedEmail: email.current.value
    }
}

export const registrationUserThunkCreator = (login, password, firstName, lastName, address, age, email) => {
    return (dispatch) => {
        dispatch(toggleRegistrationProgress(true))
        userRegistrationRequest(login, firstName, lastName, password, address, age, email)
            .then(data => {
                if (data.itsFine) {
                    alert("Пользователь успешно зарегистрирован")
                } else (
                    alert(`Пользователь не был зарегистрирован - ${data.error}`)
                )
                dispatch(toggleRegistrationProgress(false))
            })
    }
}

export default registrationPageReducer;