import React from "react";
import s from "./FormsElements.module.css"

export const Textarea = ({input, meta, ...props}) => {
    return (<div>
        <textarea {...input} {...props}/>
    </div>)
}

export const Input = ({input, meta, ...props}) => {
    const haveError = meta.touched && meta.error
    debugger
    return (<div className={s.inputBar}>
        <input className={s.authRegInputs + " " + (haveError ? s.error: null)} {...input} {...props}/>
        {haveError ?
            <span className={s.errorText}>{meta.error}</span>
            : null}
    </div>)
}