import s from '../AuthoReg.module.css';
import React from 'react';
import {NavLink} from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const AuthorizationPage = (props) => {
    let enterLogin = React.createRef();
    let enterPassword = React.createRef();


    let link = "/";
    let isFits = false; //этот флаг должен придти с сервера
    //сверив данные с веденными пользователем:
    if ((props.introducedLogin == "vervulva")&&(props.introducedPassword == "12345")) {
       isFits = true
    }
    if (isFits) {link = "/AuthUser/ProfilePage"}

    return (
        <div className={s.wrapper}>
            <Header/>
            <div className={s.main}>
                <div className={s.form}>
                    <div className={s.autorisation}>
                        <h3>Авторицация</h3>
                        <div className={s.interLogin}>
                            <p>Введите логин:</p>
                            <input value={props.introducedLogin} onChange={() => props.onInputLogin(enterLogin)} ref={enterLogin} type="text"/>
                        </div>
                        <div className={s.interPassword}>
                            <p>Введите пароль:</p>
                            <input value={props.introducedPassword} onChange={() => props.onInputPassword(enterPassword)} ref={enterPassword} type="password"/>
                        </div>
                        <div className={s.entryButton}>
                            <button onClick={() => props.onUserVerification(isFits)}><NavLink to ={link}>ENTRY</NavLink></button>
                        </div>
                        <div className={s.regLink}>
                            <p>Еще не зарегистрированы ? <NavLink to ="/RegistrationPage">Регистрация</NavLink> </p>
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