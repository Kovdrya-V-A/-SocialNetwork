import s from './AutoReg.module.css';
import React from 'react';
import {NavLink} from "react-router-dom";
//здесь будет код страницы авторизации и регистрации.
// он будет пока здесь весь, но вообще так не делается -
// код потом разнесется по компонентам. Хз, может важно учитывать.

const Autorisation = () => {
    return (
        <div className={s.autorisation}>
            <h3>Авторицация</h3>
            <div className={s.interLogin}>
                <p>Введите логин:</p>
                <input type="text"/>
            </div>
            <div className={s.interPassword}>
                <p>Введите пароль:</p>
                <input type="text"/>
            </div>
            <div className={s.regLink}>
                <a href="/S">Reg</a>
            </div>
            <div className={s.entryButton}>
                <button>ENTRY</button>
            </div>
        </div>
    )
}

const Registration = () => {
    return (
        <div className={s.registration}>
            <h3>Регистрация</h3>
            <div className={s.interLogin}>
                <p>Введите логин:</p>
                <input type="text"/>
            </div>
            <div className={s.interPassword}>
                <p>Введите пароль:</p>
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
            <div className={s.interGroupName}>
                <p>Введите группу:</p>
                <input type="text"/>
            </div>
            <div className={s.regButton}>
                <button>Regarion</button>
            </div>
        </div>
    )
}


const AutoReg = () => {
    return (
        <div className={s.autoReg}>
            <Autorisation/>
            <Registration/>
        </div>
    )
}

export default AutoReg;