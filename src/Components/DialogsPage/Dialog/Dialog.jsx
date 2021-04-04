import {NavLink} from "react-router-dom";
import React from 'react';
import s from './Dialog.module.css'
const Dialog = (props) => {
    return (
        <div className={s.dialog}>
            <div className={s.dialogAva}>
                <img src={props.dialogAva} alt="dialogava"/>
            </div>
            <NavLink className={s.dialogLink} activeClassName={s.activeDialog}
                     to={"/DialogsPage/" + props.id}>{props.name}</NavLink>
        </div>
    )
}
export default Dialog;