import {combineReducers, createStore} from "redux";
import dialogsPageReducer from "./Reducers/DialogsPageReducer";
import profilePageReducer from "./Reducers/ProfilePageReducer";
import newsPageReducer from "./Reducers/NewsPageReducer";
import usersPageReducer from "./Reducers/UsersPageReducer";
import authorisationPageReducer from "./AuthoRegReducers/AuthorizationPageReducer";

let reducers = combineReducers({
    dialogsPage: dialogsPageReducer,
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    newsPage: newsPageReducer,
    authorizationPage: authorisationPageReducer
})

let store = createStore (reducers)

export default store