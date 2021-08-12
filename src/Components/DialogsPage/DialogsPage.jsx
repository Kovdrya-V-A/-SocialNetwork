import React from 'react';
import s from './DialogsPage.module.css'
import {Redirect} from "react-router-dom";
import MessagesBar from "./MessagesBar/MessagesBar";
import DialogList from "./DialogList/DialogList"

const DialogsPage = (props) => {


    return <>
        {!props.currentDialogId ? <Redirect to={"/AuthUser/DialogsPage" + props.currentDialogId}/> : null}
        <div className={s.dialogsPage}>
            {props.currentDialogId ? <MessagesBar
                messagesData={props.messagesData}
                newMessageText={props.newMessageText}
                onMessageTextChange={props.onMessageTextChange}
                onSendNewMessage={props.onSendNewMessage}
                onDeleteMassage={props.onDeleteMassage}/> : null}

            <DialogList
                dialogsData={props.dialogsData}
                onSetCurrentDialog={props.onSetCurrentDialog}/>
        </div>
    </>

}


export default DialogsPage;