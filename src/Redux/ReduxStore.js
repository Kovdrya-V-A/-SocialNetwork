import {combineReducers, createStore} from "redux";
import dialogsPageReducer from "./DialogsPageReducer";
import profilePageReducer from "./ProfilePageReducer";
import newsPageReducer from "./NewsPageReducer";
import FriendsPageReducer from "./FriendsPageReducer";

let reducers = combineReducers({
    dialogsPage: dialogsPageReducer,
    profilePage: profilePageReducer,
    friendsPage: FriendsPageReducer,
    newsPage: newsPageReducer
})

let store = createStore (reducers)

export default store