import React, {useEffect} from 'react';
import s from './DialogsPage.module.css'
import {Redirect} from "react-router-dom";
import MessagesBar from "./MessagesBar/MessagesBar";
import DialogList from "./DialogList/DialogList"

// export let ws = new WebSocket(`ws://188.32.105.146:8000/ws`)



let DialogsPage = (props) => {

    // useEffect(() => {
    //     ws.addEventListener('message', (e) => {
    //         let response = JSON.parse(e.data)
    //         if (response.type === "checkMessages") {
    //             console.log("Rabotayou")
    //             props.setMessages(response.items)
    //         }
    //
    //     })
    // })

    return <>
        {!props.currentDialogId ? <Redirect to={"/AuthUser/DialogsPage" + props.currentDialogId}/> : null}
        <div className={s.dialogsPage}>
            {props.currentDialogId ? <MessagesBar
                sendMessageInProgress = {props.sendMessageInProgress}
                deleteMessageInProgress ={props.deleteMessageInProgress}
                messagesData={props.messagesData}
                newMessageText={props.newMessageText}
                onSendNewMessage={props.onSendNewMessage}
                onDeleteMassage={props.onDeleteMassage}/> : null}

            <DialogList
                setCurrentDialogInProgress = {props.setCurrentDialogInProgress}
                dialogsData={props.dialogsData}
                onDeleteDialog = {props.onDeleteDialog}
                onSetCurrentDialog={props.onSetCurrentDialog}
                deleteDialogInProgress={props.deleteDialogInProgress}/>
        </div>
    </>

}


export default React.memo(DialogsPage);