import s from '../AuthoReg.module.css';
import sForm from '../../Common/FormsElements/FormsElements.module.css';
import React from 'react';
import {NavLink} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {Field, reduxForm} from "redux-form";
import {requiredField} from "../../Common/Validators/Validators";
import {CreateFormItem} from "../../Common/FormsElements/FormsElements";

const AuthorizationPage = (props) => {

    const onSubmit = (formData) => {
        props.onUserVerification(formData.login, formData.password)
    }
    return (
        <>
            <Header/>
            <div className={`container ${s.authorisation_block}`}>
                <div className={`${s.authorisation_center} p-3`}>
                    <div className="text-center mb-3">
                        <h3>Авторизация</h3>
                    </div>
                    <ReduxAuthorizationForm authorisationInProgress={props.authorisationInProgress}
                                            onSubmit={onSubmit}/>
                    <hr/>
                    <div className={'btn btn-success w-100'}>
                        <NavLink className={s.link} to="/RegistrationPage">Регистрация</NavLink>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

const InputForm = CreateFormItem("input")

//вместо div лучше использовать label тогда при клике по названию будет фокус на поле ввода
//но лучше вообще избегать таких объяснений. От этого давно отшли. Например https://www.facebook.com/
let AuthorizationForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={'mb-4'}>
                {/* <label htmlFor="login">Введите логин:</label>*/}
                <Field id="login" className="form-control" type="text" placeholder="Логин" name={"login"}
                       validate={[requiredField]} component={InputForm}/>
            </div>
            <div className={'mb-4'}>
                {/* <label htmlFor="pass">Введите пароль:</label>*/}
                <Field id="pass" className="form-control" type="password" placeholder="Пароль" name={"password"}
                       validate={[requiredField]} component={InputForm}/>
            </div>
            <div className={s.entryButton}>
                {props.error ? <div className={s.summaryErrorBar}>
                    <spans className={sForm.summaryError}>
                        {props.error}
                    </spans>
                </div> : null}
                <button
                    className={'btn btn-primary ps-4 pe-4'}
                    type="submit"
                    disabled={props.authorisationInProgress}>
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