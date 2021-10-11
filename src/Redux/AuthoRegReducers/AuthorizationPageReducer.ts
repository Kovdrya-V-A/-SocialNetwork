import {userVerificationRequest} from "../../DAL/ApiRequests";
import {stopSubmit} from "redux-form"

const AuthPActionsTypes = {
    USER_VERIFICATION: "USER_VERIFICATION",
    RESET_VERIFICATION: "RESET_VERIFICATION",
    SET_USER_TOKEN: "SET_USER_TOKEN",
    SET_AUTH_USER_ID: "SET_AUTH_USER_ID",
    TOGGLE_AUTHORISATION_PROGRESS: "TOGGLE_AUTHORISATION_PROGRESS",
}


type ActionType = {
    type: typeof AuthPActionsTypes.SET_AUTH_USER_ID |
        typeof  AuthPActionsTypes.USER_VERIFICATION |
        typeof  AuthPActionsTypes.RESET_VERIFICATION|
        typeof  AuthPActionsTypes.SET_USER_TOKEN

    authUserId?: number
    token?: any
    authorisationInProgress?: boolean
}

let initialAuthorisationPage = {
    auth: false as boolean,
    authorisationInProgress: false as boolean | undefined,
    authUserId: null as number | null | undefined,
};

export type initialStateType = typeof initialAuthorisationPage


const authorisationPageReducer = (authorisationPage = initialAuthorisationPage, action: ActionType ): initialStateType => {
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
            return authorisationPage
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

export const setAuthUserId = (authUserId: number) => {
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
export const setUserToken = (token: string) => {
    return {
        type: AuthPActionsTypes.SET_USER_TOKEN,
        token
    }
}
export const toggleAuthorisationProgress = (authorisationInProgress: boolean) => {
    return {
        type: AuthPActionsTypes.TOGGLE_AUTHORISATION_PROGRESS,
        authorisationInProgress: authorisationInProgress
    }
}

export const userVerificationThunkCreator = (login: string, password: string) => {
    return async (dispatch: Function) => {
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


export const resetVerificationThunkCreator = () => (dispatch: Function) => {
    dispatch(resetVerification())
}

export default authorisationPageReducer;