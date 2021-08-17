import React, {useEffect} from 'react';
import s from './DialogsPage.module.css'
import {Redirect} from "react-router-dom";
import MessagesBar from "./MessagesBar/MessagesBar";
import DialogList from "./DialogList/DialogList"

export let ws = new WebSocket(`ws://188.32.105.146:8000/ws?token=${localStorage.getItem("userToken")}`)

const DialogsPage = (props) => {

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            console.log(e.data)
        })
    })

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