import s from '../AuthoReg.module.css';
import React from 'react';
import {NavLink} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {Field, reduxForm} from "redux-form";

const AuthorizationPage = (props) => {

    const onSubmit = (formData) => {
        props.onUserVerification(formData.login, formData.password)
    }
    return (
        <div className={s.wrapper}>
            <Header/>
            <div className={s.main}>
                <div className={s.form}>
                    <div className={s.authorisation}>
                        <h3>Авторизация</h3>
                        <ReduxAuthorizationForm authorisationInProgress = {props.authorisationInProgress}  onSubmit = {onSubmit}/>
                        <div className={s.regLink}>
                            <p>Еще не зарегистрированы ? <NavLink className={s.link}
                                                                  to="/RegistrationPage">Регистрация</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


let AuthorizationForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.enterLogin}>
                <p>Введите логин:</p>
                <Field type="text" placeholder="Логин" name ={"login"} component={"input"} />
            </div>
            <div className={s.enterPassword}>
                <p>Введите пароль:</p>
                <Field type="password" placeholder="Пароль" name ={"password"} component={"input"}/>
            </div>
            <div className={s.entryButton}>
                <button
                    disabled={props.authorisationInProgress}
                >
                    Вход
                </button>
            </div>
        </form>
    )
}

const ReduxAuthorizationForm = reduxForm({
    form: "authorization"
})(AuthorizationForm)


export default React.memo(AuthorizationPage);