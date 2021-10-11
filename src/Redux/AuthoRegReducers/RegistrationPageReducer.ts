import {userRegistrationRequest} from "../../DAL/ApiRequests";

const TOGGLE_REGISTRATION_PROGRESS = "TOGGLE_REGISTRATION_PROGRESS";

export type ActionType = {
    type: typeof TOGGLE_REGISTRATION_PROGRESS
    registrationInProgress?: boolean
}

let initialRegistrationPage = {
    registrationInProgress: false as boolean | undefined,
};
export type initialStateType = typeof initialRegistrationPage

const registrationPageReducer = (registrationPage = initialRegistrationPage, action: ActionType): initialStateType => {
    switch (action.type) {
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

export const toggleRegistrationProgress = (registrationInProgress: boolean) => {
    return {
        type: TOGGLE_REGISTRATION_PROGRESS,
        registrationInProgress: registrationInProgress
    }
}


export const registrationUserThunkCreator = (login: string, password: string, firstName:string, lastName:string, address:string, age:number, email:string) => {
    return async (dispatch: Function) => {
        dispatch(toggleRegistrationProgress(true))
        let data = await userRegistrationRequest(login, firstName, lastName, password, address, age, email)
        if (data.itsFine) {
            alert("Пользователь успешно зарегистрирован")
        } else (
            alert(`Пользователь не был зарегистрирован - ${data.error}`)
        )
        dispatch(toggleRegistrationProgress(false))
    }
}

export default registrationPageReducer;