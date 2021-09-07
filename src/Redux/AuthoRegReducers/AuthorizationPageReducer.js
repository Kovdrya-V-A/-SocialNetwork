import {userVerificationRequest} from "../../DAL/ApiRequests";
const USER_VERIFICATION = "USER_VERIFICATION";
const RESET_VERIFICATION = "RESET_VERIFICATION";
const SET_USER_TOKEN = "SET_USER_TOKEN";
const SET_SESSION_IS_START = "SET_SESSION_IS_START";
const TOGGLE_AUTHORISATION_PROGRESS = "TOGGLE_AUTHORISATION_PROGRESS"


let initialAuthorisationPage = {
    auth: false,
    sessionIsStart: false,
    authorisationInProgress: false,
};

const authorisationPageReducer = (authorisationPage = initialAuthorisationPage, action) => {
    switch (action.type) {

        case USER_VERIFICATION:
            if (action.auth) {
                alert("Добро пожаловать !")
                return {
                    ...authorisationPage,
                    auth: action.auth
                }
            } else {
                alert("Неверный логин или пароль")
            }

        case RESET_VERIFICATION:
            localStorage.removeItem("userToken")
            return {
                ...authorisationPage,
                auth: false
            }
        case SET_USER_TOKEN:
            localStorage.setItem("userToken", action.token)
        default: {
            return authorisationPage
        }
        case SET_SESSION_IS_START:
            return {
                ...authorisationPage,
                sessionIsStart: true

            }
        case TOGGLE_AUTHORISATION_PROGRESS:
            return {
                ...authorisationPage,
                authorisationInProgress: action.authorisationInProgress
            }

    }
}


export const userVerification = (isFits) => {
    return {
        type: USER_VERIFICATION,
        auth: isFits
    }
}
export const resetVerification = () => {
    return {
        type: RESET_VERIFICATION
    }

}
export const setUserToken = (token) => {
    return {
        type: SET_USER_TOKEN,
        token
    }
}
export const toggleAuthorisationProgress = (authorisationInProgress) => {
    return {
        type: TOGGLE_AUTHORISATION_PROGRESS,
        authorisationInProgress: authorisationInProgress
    }
}

export const userVerificationThunkCreator = (login, password) => {
    return (dispatch) => {
        dispatch(toggleAuthorisationProgress(true))
        userVerificationRequest(login, password)
            .then(data => {
                if (data.key_type) {
                    dispatch(setUserToken(data.access_token))
                }
                dispatch(userVerification(data.key_type))
                dispatch(toggleAuthorisationProgress(false))
            })
    }
}

export default authorisationPageReducer;