import {userVerificationRequest} from "../../DAL/ApiRequests";
import {stopSubmit} from "redux-form";

const USER_VERIFICATION = "USER_VERIFICATION";
const RESET_VERIFICATION = "RESET_VERIFICATION";
const SET_USER_TOKEN = "SET_USER_TOKEN";
const TOGGLE_AUTHORISATION_PROGRESS = "TOGGLE_AUTHORISATION_PROGRESS"


let initialAuthorisationPage = {
    auth: false,
    authorisationInProgress: false,
};

const authorisationPageReducer = (authorisationPage = initialAuthorisationPage, action) => {
    switch (action.type) {

        case USER_VERIFICATION:
            return {
                ...authorisationPage,
                auth: true
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
        case TOGGLE_AUTHORISATION_PROGRESS:
            return {
                ...authorisationPage,
                authorisationInProgress: action.authorisationInProgress
            }

    }
}


export const userVerification = () => {
    return {
        type: USER_VERIFICATION,
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
    return async (dispatch) => {
        dispatch(toggleAuthorisationProgress(true))
        let data = await userVerificationRequest(login, password)
        if (data.key_type) {
            dispatch(setUserToken(data.access_token))
            dispatch(userVerification())
        } else {
            let action = stopSubmit("authorization", {_error: data.message})
            dispatch(action)
        }
        dispatch(toggleAuthorisationProgress(false))
    }
}


export const resetVerificationThunkCreator = () => (dispatch) => {
    dispatch(resetVerification())
}

export default authorisationPageReducer;