const INPUT_LOGIN_STATE = "INPUT_LOGIN_STATE";
const INPUT_PASSWORD_STATE = "INPUT_PASSWORD_STATE";
const INPUT_FIRST_NAME_STATE = "INPUT_FIRST_NAME_STATE";
const INPUT_LAST_NAME_STATE = "INPUT_LAST_NAME_STATE";

let initialRegistrationPage = {
    introducedLogin: "",
    introducedPassword: "",
    introducedFirstName: "",
    introducedLastName: "" ,
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
            return  {
                ...registrationPage,
                introducedFirstName: action.introducedFirstName
            }

        case INPUT_LAST_NAME_STATE:
            return  {
                ...registrationPage,
                introducedLastName: action.introducedLastName
            }

        default: {
            return registrationPage
        }
    }
}


export const inputLoginActionCreator = (login) => {
    return {
        type: INPUT_LOGIN_STATE,
        introducedLogin: login.current.value
    }
}

export const inputPasswordActionCreator = (password) => {
    return {
        type: INPUT_PASSWORD_STATE,
        introducedPassword: password.current.value
    }
}

export const inputFirstNameActionCreator = (firstName) => {
    return {
        type: INPUT_FIRST_NAME_STATE,
        introducedFirstName: firstName.current.value
    }
}

export const inputLastNameActionCreator = (lastName) => {
    return {
        type:INPUT_LAST_NAME_STATE,
        introducedLastName: lastName.current.value
    }
}






export default registrationPageReducer;