import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import appReducer from "./Reducers/AppReducer";
import dialogsPageReducer from "./Reducers/DialogsPageReducer";
import profilePageReducer from "./Reducers/ProfilePageReducer";
import newsPageReducer from "./Reducers/NewsPageReducer";
import usersPageReducer from "./Reducers/UsersPageReducer";
import authorisationPageReducer from "./AuthoRegReducers/AuthorizationPageReducer";
import registrationPageReducer from "./AuthoRegReducers/RegistrationPageReducer";
import friendsPageReducer from "./Reducers/FriendsPageReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form"


const enchansers = [applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()]
let reducers = combineReducers({
    app: appReducer,
    dialogsPage: dialogsPageReducer,
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    newsPage: newsPageReducer,
    authorizationPage: authorisationPageReducer,
    registrationPage: registrationPageReducer,
    friendsPage: friendsPageReducer,
    form: formReducer
})
const store = createStore(reducers, compose(...enchansers));


export default store