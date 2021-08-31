import React from 'react';
import s from '../DialogsPage.module.css'
import Dialog from "./Dialog/Dialog"


const DialogList = (props) => {

    let dialogsItems = props.dialogsData.map(d => d.isDeleted ? null :
        <Dialog
            deleteDialogInProgress = {props.deleteDialogInProgress}
            setCurrentDialogInProgress = {props.setCurrentDialogInProgress}
            key = {d.idDialog}
            onSetCurrentDialog={props.onSetCurrentDialog}
            dialogAva={d.img} idDialog={d.idDialog}
            chatName={d.name}
            onDeleteDialog={props.onDeleteDialog}/>)

    return (
        <div className={s.dialogList}>
            <h2>Список диалогов:</h2>
            {props.dialogsData.length > 0 ? dialogsItems :
                <p>У вас пока нет активых диалогов. Напишите кому - нибудь, и здесь появится диалог</p>}
        </div>
    )
}
export default DialogList