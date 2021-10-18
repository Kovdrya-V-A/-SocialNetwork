import s from '../AuthoReg.module.css';
import sForm from '../../Common/FormsElements/FormsElements.module.css';
import React from 'react';
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {requiredField} from "../../Common/Validators/Validators";
import {CreateFormItem} from "../../Common/FormsElements/FormsElements";

type AuthPagePropsType = {
    authorisationInProgress: boolean
    onUserVerification: (login: string, password: string) => void
}

type FormDataType = {
    login: string
    password: string
}

const AuthorizationPage: React.FC<AuthPagePropsType> = ({authorisationInProgress, onUserVerification}) => {

    const onSubmit = (formData: FormDataType) => {
        onUserVerification(formData.login, formData.password)
    }
    return (
        <div className={s.wrapper}>
            <div className={s.authorisation}>
                <h3>Авторизация</h3>
                <ReduxAuthorizationForm authorisationInProgress={authorisationInProgress} onSubmit={onSubmit}/>
                <div className={s.regLink}>
                    <p>Еще не зарегистрированы ? <NavLink className={s.link}
                                                          to="/RegistrationPage">Регистрация</NavLink></p>
                </div>
            </div>
        </div>
    );
}

const InputForm = CreateFormItem("input")

let AuthorizationForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.enterLogin}>
                <p>Введите логин:</p>
                <Field type="text" placeholder="Логин" name={"login"} validate={[requiredField]} component={InputForm}/>
            </div>
            <div className={s.enterPassword}>
                <p>Введите пароль:</p>
                <Field type="password" placeholder="Пароль" name={"password"} validate={[requiredField]}
                       component={InputForm}/>
            </div>
            <div className={s.entryButton}>
                {props.error ? <div className={s.summaryErrorBar}>
                    <span className={sForm.summaryError}>
                        {props.error}
                    </span>
                </div> : null}
                <button
                    type="submit"
                    disabled={props.authorisationInProgress}>
                    Вход
                </button>
            </div>
        </form>
    )
}

const ReduxAuthorizationForm: any = reduxForm({
    form: "authorization"
})(AuthorizationForm)
export default React.memo(AuthorizationPage);
