import {userRegistrationRequest} from "../../DAL/ApiRequests";
const TOGGLE_REGISTRATION_PROGRESS = "TOGGLE_REGISTRATION_PROGRESS";

let initialRegistrationPage = {
    registrationInProgress: false,
};

const registrationPageReducer = (registrationPage = initialRegistrationPage, action) => {
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

export const toggleRegistrationProgress = (registrationInProgress) => {
    return {
        type: TOGGLE_REGISTRATION_PROGRESS,
        registrationInProgress: registrationInProgress
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