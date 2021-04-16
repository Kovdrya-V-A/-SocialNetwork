import {combineReducers, createStore} from "redux";
import dialogsPageReducer from "./DialogsPageReducer";
import profilePageReducer from "./ProfilePageReducer";
import newsPageReducer from "./NewsPageReducer";
import usersPageReducer from "./UsersPageReducer";

let reducers = combineReducers({
    dialogsPage: dialogsPageReducer,
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    newsPage: newsPageReducer
})

let store = createStore (reducers)

export default store