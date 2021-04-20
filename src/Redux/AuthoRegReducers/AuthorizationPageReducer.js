const INPUT_LOGIN_STATE = "INPUT_LOGIN_STATE";
const INPUT_PASSWORD_STATE = "INPUT_PASSWORD_STATE";
const USER_VERIFICATION = 'USER_VERIFICATION';
const CHANGE_LINK = 'CHANGE_LINK'

let initialAuthorisationPage = {
    introducedLogin: "",
    introducedPassword: "",
    dataIsCorrect: false,
    startLink: '/'

};

const authorisationPageReducer = (authorisationPage = initialAuthorisationPage, action) => {

    switch (action.type) {
        case INPUT_LOGIN_STATE:

            return {
                ...authorisationPage,
                introducedLogin: action.introducedLogin
            }

        case INPUT_PASSWORD_STATE:

            return {
                ...authorisationPage,
                introducedPassword: action.introducedPassword
            }

        case USER_VERIFICATION:
            if (action.dataIsCorrect) {
                alert("Добро пожаловать !")
                return {
                    ...authorisationPage,
                    dataIsCorrect: action.dataIsCorrect
                }
            } else alert("Неверный логин или пароль")

        case CHANGE_LINK:
            return {
                ...authorisationPage,
                startLink: action.startLink
            }

        default: {
            return authorisationPage
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

export const userVerificationActionCreator = (isFits) => {
    return {
        type: USER_VERIFICATION,
        dataIsCorrect: isFits
    }
}

export const changeLinkActionCreator = (link) => {
    return {
        type: INPUT_PASSWORD_STATE,
        startLink: link
    }
}


export default authorisationPageReducer;