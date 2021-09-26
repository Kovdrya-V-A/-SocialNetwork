import {checkAuthMeRequest} from "../../DAL/ApiRequests";
import {userVerification} from "../AuthoRegReducers/AuthorizationPageReducer";

const SET_SESSION_IS_START = "SET_SESSION_IS_START";


let initialAppState = {
    sessionIsStart: false,
};

const appReducer = (appState = initialAppState, action) => {
    switch (action.type) {

        case SET_SESSION_IS_START:
            return {
                ...appState,
                sessionIsStart: true
            }
        default:
            return appState

    }
}

export const setSessionIsStart = () => {
    return {
        type: SET_SESSION_IS_START
    }
}

export const checkAuthMeThunkCreator = () => async (dispatch) => {
    let data = await checkAuthMeRequest()
            if (data.auth) {
                dispatch(userVerification())
            }
            return true
}

export const setSessionIsStartThunkCreator = () => async (dispatch) => {
    await dispatch(checkAuthMeThunkCreator())
    dispatch(setSessionIsStart())

}


export default appReducer;