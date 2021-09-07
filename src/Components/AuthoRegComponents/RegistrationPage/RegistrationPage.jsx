import s from "../AuthoReg.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {Field, reduxForm} from "redux-form";

const RegistrationPage = (props) => {

    let onSubmit = (formData) => {

        props.onRegistrationUser(
            formData.login,
            formData.password,
            formData.firstName,
            formData.lastName,
            formData.address,
            formData.age,
            formData.email
        )
    }

    return (
        <div className={s.wrapper}>
            <Header/>
            <div className={s.main}>
                <div className={s.form}>
                    <div className={s.registration}>
                        <h3>Регистрация</h3>
                        <ReduxRegistrationPageForm onSubmit={onSubmit}
                                                   registrationInProgress={props.registrationInProgress}/>
                        <div className={s.authLink}>
                            <p>Уже есть аккаунт ? <NavLink className={s.link} to="/">Авторизация</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


const RegistrationPageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={s.interLogin}>
            <p>Придумайте логин:</p>
            <Field name={"login"} component={"input"} type="text"
                   placeholder="Логин"/>
        </div>
        <div className={s.interEmail}>
            <p>Введите ваш Email:</p>
            <Field name={"email"} component={"input"} type="text" placeholder="Email"/>
        </div>
        <div className={s.interName}>
            <p>Введите имя:</p>
            <Field name={"firstName"} component={"input"}
                   type="text" placeholder="Имя"/>
        </div>
        <div className={s.interFirstname}>
            <p>Введите фамилию:</p>
            <Field name={"lastName"} component={"input"}
                   type="text" placeholder="Фамилия"/>
        </div>
        <div className={s.interAddress}>
            <p>Введите ваш город:</p>
            <Field name={"address"} component={"input"}
                   type="text" placeholder="Город"/>
        </div>
        <div className={s.interAge}>
            <p>Укажите ваш возраст:</p>
            <Field name={"age"} component={"input"}
                   type="text" placeholder="Возраст"/>
        </div>
        <div className={s.interPassword}>
            <p>Придумайте пароль:</p>
            <Field name={"password"} component={"input"} type="password" placeholder="Пароль"/>
        </div>
        <div className={s.regButton}>
            <button disabled={props.registrationInProgress}
            >Регистрация
            </button>
        </div>
    </form>
}

const ReduxRegistrationPageForm = reduxForm({
    form: "registration"
})(RegistrationPageForm)

export default React.memo(RegistrationPage)