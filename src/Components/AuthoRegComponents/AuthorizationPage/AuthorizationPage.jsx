import s from '../AuthoReg.module.css';
import React from 'react';
import {NavLink, Redirect} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {Field, reduxForm} from "redux-form";
import Friend from "../../FriendsPage/FriendList/Friend/Friend";

const AuthorizationPage = (props) => {

    if (props.auth) {
        return <Redirect to="/AuthUser/ProfilePage"/>
    }
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
                        {/*<div className={s.enterLogin}>*/}
                        {/*    <p>Введите логин:</p>*/}
                        {/*    <input value={props.introducedLogin} onChange={() => props.onInputLogin(enterLogin)}*/}
                        {/*           ref={enterLogin} type="text" placeholder="Логин"/>*/}
                        {/*</div>*/}
                        {/*<div className={s.enterPassword}>*/}
                        {/*    <p>Введите пароль:</p>*/}
                        {/*    <input value={props.introducedPassword}*/}
                        {/*           onChange={() => props.onInputPassword(enterPassword)}*/}
                        {/*           ref={enterPassword}*/}
                        {/*           type="password" placeholder="Пароль"/>*/}
                        {/*</div>*/}
                        {/*<div className={s.entryButton}>*/}
                        {/*    <button*/}
                        {/*        disabled={props.authorisationInProgress}*/}
                        {/*        onClick={() => {*/}
                        {/*            props.onUserVerification(props.introducedLogin, props.introducedPassword)*/}
                        {/*        }}>*/}
                        {/*        Вход*/}
                        {/*    </button>*/}
                        {/*</div>*/}
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