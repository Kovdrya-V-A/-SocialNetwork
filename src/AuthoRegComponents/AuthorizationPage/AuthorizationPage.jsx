import s from '../AuthoReg.module.css';
import React from 'react';
import {NavLink, Redirect} from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const AuthorizationPage = (props) => {
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
                                onClick={() => {
                                    props.onUserVerification(props.introducedLogin, props.introducedPassword)
                                }}>
                                {props.dataIsCorrect ? <Redirect to="/AuthUser/ProfilePage"/> : null}
                                {props.dataIsCorrect ? props.onResetVerification() : null}
                                Entry
                            </button>
                        </div>
                        <div className={s.regLink}>
                            <p>Еще не зарегистрированы ? <NavLink className = {s.link} to="/RegistrationPage">Регистрация</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

<a href="/S">Регистрация</a>


export default AuthorizationPage;