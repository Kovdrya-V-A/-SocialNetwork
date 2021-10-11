import {checkAuthMeRequest} from "../../DAL/ApiRequests";
import {userVerification} from "../AuthoRegReducers/AuthorizationPageReducer";
import {setMyId} from "./ProfilePageReducer";

const SET_SESSION_IS_START = "SET_SESSION_IS_START";


export type initialStateType = {
    sessionIsStart: boolean
}
let initialAppState: initialStateType = {
    sessionIsStart: false,
};

type actionType = {
    type: string
}

const appReducer = (appState = initialAppState, action: actionType): initialStateType => {
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

export type setSessionActionType = {
    type: typeof SET_SESSION_IS_START
}

export const setSessionIsStart = (): setSessionActionType => {
    return {
        type: SET_SESSION_IS_START,
    }
}

export const checkAuthMeThunkCreator = () => async (dispatch: Function) => {
    let data = await checkAuthMeRequest()
            if (data.auth) {
                dispatch(userVerification())
                dispatch(setMyId(data.myId))
            }
            return true
}

export const setSessionIsStartThunkCreator = () => async (dispatch: Function) => {
    await dispatch(checkAuthMeThunkCreator())
    dispatch(setSessionIsStart())

}


export default appReducer;