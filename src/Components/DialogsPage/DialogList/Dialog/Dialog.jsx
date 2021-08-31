import {NavLink} from "react-router-dom";
import React from 'react';
import s from './Dialog.module.css'

const Dialog = (props) => {
    return (
        <div className={s.dialog}>
            <div className={s.dialogAva}>
                <img src={props.dialogAva} alt="dialogAva"/>
            </div>
            <button
                disabled={props.setCurrentDialogInProgress}
                onClick={() => props.onSetCurrentDialog(props.idDialog)}
                className={s.dialogLinkButton}><NavLink
                className={s.dialogLink} activeClassName={s.activeDialog}
                to={`/AuthUser/DialogsPage/${props.idDialog}`}>{props.chatName}</NavLink></button>
            <div className={s.deleteDialog}><button disabled={props.deleteDialogInProgress} onClick={() => props.onDeleteDialog(props.idDialog)}><p>×</p></button></div>
        </div>
    )
}
export default Dialog;