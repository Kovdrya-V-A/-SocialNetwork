import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/ReduxStore";
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import AuthorizationPageContainer from "./Components/AuthoRegComponents/AuthorizationPage/AuthorizationPageContainer";
import RegistrationPageContainer from "./Components/AuthoRegComponents/RegistrationPage/RegistrarionPageContainer";


ReactDOM.render(

        <BrowserRouter>
            <Provider store={store}>
                <Route path="/AuthUser" render={() => <App/>}/>
                <Route exact path="/" render={() => <AuthorizationPageContainer/>}/>
                <Route path="/RegistrationPage" render={() => <RegistrationPageContainer/>}/>
            </Provider>
        </BrowserRouter>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();