import {userVerificationRequest} from "../../DAL/ApiRequests";
import {stopSubmit} from "redux-form";

const AuthPActionsTypes = {
    USER_VERIFICATION: "USER_VERIFICATION",
    RESET_VERIFICATION: "RESET_VERIFICATION",
    SET_USER_TOKEN: "SET_USER_TOKEN",
    SET_AUTH_USER_ID: "SET_AUTH_USER_ID",
    TOGGLE_AUTHORISATION_PROGRESS: "TOGGLE_AUTHORISATION_PROGRESS",
}


let initialAuthorisationPage = {
    auth: false,
    authorisationInProgress: false,
    authUserId: null,
};

const authorisationPageReducer = (authorisationPage = initialAuthorisationPage, action) => {
    switch (action.type) {

        case AuthPActionsTypes.USER_VERIFICATION:
            return {
                ...authorisationPage,
                auth: true
            }

        case AuthPActionsTypes.SET_AUTH_USER_ID:
            return {
                ...authorisationPage,
                authUserId: action.authUserId
            }

        case AuthPActionsTypes.RESET_VERIFICATION:
            localStorage.removeItem("userToken")
            return {
                ...authorisationPage,
                auth: false
            }
        case AuthPActionsTypes.SET_USER_TOKEN:
            localStorage.setItem("userToken", action.token)
        default: {
            return authorisationPage
        }
        case AuthPActionsTypes.TOGGLE_AUTHORISATION_PROGRESS:
            return {
                ...authorisationPage,
                authorisationInProgress: action.authorisationInProgress
            }

    }
}

export const setAuthUserId = (authUserId) => {
    return {
        type: AuthPActionsTypes.SET_AUTH_USER_ID,
        authUserId
    }
}


export const userVerification = () => {
    return {
        type: AuthPActionsTypes.USER_VERIFICATION,
    }
}
export const resetVerification = () => {
    return {
        type: AuthPActionsTypes.RESET_VERIFICATION
    }

}
export const setUserToken = (token) => {
    return {
        type: AuthPActionsTypes.SET_USER_TOKEN,
        token
    }
}
export const toggleAuthorisationProgress = (authorisationInProgress) => {
    return {
        type: AuthPActionsTypes.TOGGLE_AUTHORISATION_PROGRESS,
        authorisationInProgress: authorisationInProgress
    }
}

export const userVerificationThunkCreator = (login, password) => {
    return async (dispatch) => {
        dispatch(toggleAuthorisationProgress(true))
        let data = await userVerificationRequest(login, password)
        if (data.key_type) {
            dispatch(setUserToken(data.access_token))
            dispatch(setAuthUserId(data.myId))
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