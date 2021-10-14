import s from "../AuthoReg.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {Field, reduxForm} from "redux-form";
import {CreateFormItem} from "../../Common/FormsElements/FormsElements";
import {checkLenghtCreator, requiredField} from "../../Common/Validators/Validators";

type RegPagePropsType = {
    onRegistrationUser: (login: string, password: string, firstName: string, lastName: string,
                         address: string, age: string, email: string) => void
    registrationInProgress: boolean
}

type FormDataType = {
    login: string
    password: string
    firstName: string
    lastName: string
    address: string
    age: string
    email: string
}

const RegistrationPage: React.FC<RegPagePropsType> = ({onRegistrationUser, registrationInProgress}) => {

    let onSubmit = (formData: FormDataType) => {

        onRegistrationUser(
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
                                                   registrationInProgress={registrationInProgress}/>
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

let requiredLengthFrom3to20 = checkLenghtCreator(3, 20)
let requiredLengthFrom5to30 = checkLenghtCreator(5, 30)

const InputForm = CreateFormItem("input")


const RegistrationPageForm = (props: any) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={s.interLogin}>
            <p>Придумайте логин:</p>
            <Field name={"login"} validate={[requiredField, requiredLengthFrom3to20]} component={InputForm} type="text"
                   placeholder="Логин"/>
        </div>
        <div className={s.interEmail}>
            <p>Введите ваш Email:</p>
            <Field name={"email"} validate={[requiredField]} component={InputForm} type="text" placeholder="Email"/>
        </div>
        <div className={s.interName}>
            <p>Введите имя:</p>
            <Field name={"firstName"} validate={[requiredField,]} component={InputForm}
                   type="text" placeholder="Имя"/>
        </div>
        <div className={s.interFirstname}>
            <p>Введите фамилию:</p>
            <Field name={"lastName"} validate={[requiredField,]} component={InputForm}
                   type="text" placeholder="Фамилия"/>
        </div>
        <div className={s.interAddress}>
            <p>Введите ваш город:</p>
            <Field name={"address"} validate={[requiredField]} component={InputForm}
                   type="text" placeholder="Город"/>
        </div>
        <div className={s.interAge}>
            <p>Укажите ваш возраст:</p>
            <Field name={"age"} validate={[requiredField]} component={InputForm}
                   type="text" placeholder="Возраст"/>
        </div>
        <div className={s.interPassword}>
            <p>Придумайте пароль:</p>
            <Field name={"password"} validate={[requiredField, requiredLengthFrom5to30]} component={InputForm}
                   type="password" placeholder="Пароль"/>
        </div>
        <div className={s.regButton}>
            <button disabled={props.registrationInProgress}
            >Регистрация
            </button>
        </div>
    </form>
}

const ReduxRegistrationPageForm: any = reduxForm({
    form: "registration"
})(RegistrationPageForm)

export default React.memo(RegistrationPage)