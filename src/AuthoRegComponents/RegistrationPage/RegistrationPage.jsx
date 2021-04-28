import s from "../AuthoReg.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const RegistrationPage = (props) => {
    let enterLogin = React.createRef();
    let enterPassword = React.createRef();
    let enterFirstName = React.createRef();
    let enterLastName = React.createRef();
    let enterAddress = React.createRef();
    let enterAge = React.createRef();
    let enterEmail = React.createRef()


    return (
        <div className={s.wrapper}>
            <Header/>
            <div className={s.main}>
                <div className={s.form}>
                    <div className={s.registration}>
                        <h3>Регистрация</h3>
                        <div className={s.interLogin}>
                            <p>Придумайте логин:</p>
                            <input value={props.introducedLogin} onChange={() => props.onInputLogin(enterLogin)}
                                   ref={enterLogin} type="text"/>
                        </div>
                        <div className={s.interEmail}>
                            <p>Введите ваш Email:</p>
                            <input value={props.introducedEmail} onChange={() => props.onInputEmail(enterEmail)}
                                   ref={enterEmail} type="text"/>
                        </div>
                        <div className={s.interName}>
                            <p>Введите имя:</p>
                            <input value={props.introducedFirstName}
                                   onChange={() => props.onInputFirstName(enterFirstName)} ref={enterFirstName}
                                   type="text"/>
                        </div>
                        <div className={s.interFirstname}>
                            <p>Введите фамилию:</p>
                            <input value={props.introducedLastName}
                                   onChange={() => props.onInputLastName(enterLastName)} ref={enterLastName}
                                   type="text"/>
                        </div>
                        <div className={s.interAddress}>
                            <p>Введите ваш город:</p>
                            <input value={props.introducedAddress} onChange={() => props.onInputAddress(enterAddress)}
                                   ref={enterAddress} type="text"/>
                        </div>
                        <div className={s.interAge}>
                            <p>Укажите ваш возраст:</p>
                            <input value={props.introducedAge} onChange={() => props.onInputAge(enterAge)}
                                   ref={enterAge} type="text"/>
                        </div>
                        <div className={s.interPassword}>
                            <p>Придумайте пароль:</p>
                            <input value={props.introducedPassword}
                                   onChange={() => props.onInputPassword(enterPassword)} ref={enterPassword}
                                   type="password"/>
                        </div>
                        <div className={s.regButton}>
                            <button onClick={() => props.onRegistrationUser(
                                props.introducedLogin,
                                props.introducedPassword,
                                props.introducedFirstName,
                                props.introducedLastName,
                                props.introducedAddress,
                                props.introducedAge,
                                props.introducedEmail)}>register
                            </button>
                        </div>
                        <div className={s.authLink}>
                            <p>Уже есть аккаунт ? <NavLink to="/">Авторизация</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default RegistrationPage