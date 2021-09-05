import s from '../AuthoReg.module.css';
import React from 'react';
import {NavLink, Redirect} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const AuthorizationPage = (props) => {

    if (props.auth) {
        return <Redirect to="/AuthUser/ProfilePage"/>
    }

    let enterLogin = React.createRef();
    let enterPassword = React.createRef();
    return (
        <div className={s.wrapper}>
            <Header/>
            <div className={s.main}>
                <div className={s.form}>
                    <div className={s.authorisation}>
                        <h3>Авторизация</h3>
                        <div className={s.enterLogin}>
                            <p>Введите логин:</p>
                            <input value={props.introducedLogin} onChange={() => props.onInputLogin(enterLogin)}
                                   ref={enterLogin} type="text" placeholder="Логин"/>
                        </div>
                        <div className={s.enterPassword}>
                            <p>Введите пароль:</p>
                            <input value={props.introducedPassword}
                                   onChange={() => props.onInputPassword(enterPassword)}
                                   ref={enterPassword}
                                   type="password" placeholder="Пароль"/>
                        </div>
                        <div className={s.entryButton}>
                            <button
                                disabled={props.authorisationInProgress}
                                onClick={() => {
                                    props.onUserVerification(props.introducedLogin, props.introducedPassword)
                                }}>
                                {/*{props.auth ? <Redirect to="/AuthUser/ProfilePage"/> : null}*/}
                                {/*{props.auth ? props.onResetVerification() : null}*/}
                                Вход
                            </button>
                        </div>
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



export default React.memo(AuthorizationPage);