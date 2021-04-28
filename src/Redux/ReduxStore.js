import {combineReducers, createStore} from "redux";
import dialogsPageReducer from "./Reducers/DialogsPageReducer";
import profilePageReducer from "./Reducers/ProfilePageReducer";
import newsPageReducer from "./Reducers/NewsPageReducer";
import usersPageReducer from "./Reducers/UsersPageReducer";
import authorisationPageReducer from "./AuthoRegReducers/AuthorizationPageReducer";
import registrationPageReducer from "./AuthoRegReducers/RegistrationPageReducer";
import selectedProfilePageReducer from "./Reducers/SelectedUserProfilePageReducer";

let reducers = combineReducers({
    dialogsPage: dialogsPageReducer,
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    newsPage: newsPageReducer,
    selectedProfilePage: selectedProfilePageReducer,
    authorizationPage: authorisationPageReducer,
    registrationPage: registrationPageReducer
})
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store