import React from "react";
import sForm from "./FormsElements.module.css"


export const CreateFormItem = (Component) => ({input, meta, ...props}) => {
    const haveError = meta.touched && meta.error

    //Если приходит класс className то подставляем его, если класс не приходит происходит прошлая логика
    //Нужно что бы подлючить стили бутстрапа
    return (
        <div className={sForm.formBar}>
            <Component {...input} {...props}
                       className={props.className ? props.className : Component === "textarea" ? sForm.textareaForm : sForm.inputForm + " " + (haveError ? sForm.error : null)}
            />
            {haveError ?
                <span className={sForm.errorText}>{meta.error}</span>
                : null}
        </div>
    )
}