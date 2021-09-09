import React from "react";
import s from "./FormsElements.module.css"

export const Textarea = ({input, meta, ...props}) => {
    return (<div>
        <textarea {...input} {...props}/>
    </div>)
}

export const Input = ({input, meta, ...props}) => {
    debugger
    return (<div className={s.inputBar}>
        <input className={s.authRegInputs} {...input} {...props}/>
        {meta.touched && meta.error ?
            <span className={s.errorText}>{meta.error}</span>
            : null}
    </div>)
}