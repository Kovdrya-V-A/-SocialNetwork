import React from 'react';
import s from './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/ReduxStore";
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import AuthorizationPageContainer from "./Components/AuthoRegComponents/AuthorizationPage/AuthorizationPageContainer";
import RegistrationPageContainer from "./Components/AuthoRegComponents/RegistrationPage/RegistrarionPageContainer";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";


ReactDOM.render(
    <HashRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <Header/>
                <Route path="/AuthUser" render={() => <App/>}/>
                <Route exact path="/" render={() => <AuthorizationPageContainer/>}/>
                <Route path="/RegistrationPage" render={() => <RegistrationPageContainer/>}/>
            <Footer/>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();