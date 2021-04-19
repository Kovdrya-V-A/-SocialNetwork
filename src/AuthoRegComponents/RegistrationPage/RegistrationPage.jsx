import s from "../AuthoReg.module.css";
import React from "react";
import {NavLink, Route} from "react-router-dom";
import Header from "../../Components/Header/Header";
import AuthorizationPage from "../AuthorizationPage/AuthorizationPage";
import Footer from "../../Components/Footer/Footer";

const RegistrationPage = () => {

    return (
        <div className={s.wrapper}>
            <Header/>
            <div className={s.main}>
                <div className={s.form}>
                    <div className={s.registration}>
                        <h3>Регистрация</h3>
                        <div className={s.interLogin}>
                            <p>Введите логин:</p>
                            <input type="text"/>
                        </div>
                        <div className={s.interName}>
                            <p>Введите имя:</p>
                            <input type="text"/>
                        </div>
                        <div className={s.interFirstname}>
                            <p>Введите фамилию:</p>
                            <input type="text"/>
                        </div>
                        <div className={s.interPassword}>
                            <p>Придумайте пароль:</p>
                            <input type="password"/>
                        </div>
                        <div className={s.regButton}>
                            <button>register</button>
                        </div>
                        <div className={s.authLink}>
                            <p>Уже есть аккаунт ? <NavLink to ="/">Авторизация</NavLink> </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default RegistrationPage