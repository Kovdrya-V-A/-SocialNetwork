import React from 'react';
import s from './DialogsPage.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";

const DialogsPage = (props) => {

    let dialogsItems = props.dialogsData.map(d => <Dialog onSetCurrentDialog={props.onSetCurrentDialog}
                                                          dialogAva={d.dialogAva} idDialog={d.idchat}
                                                          chatName={d.chatName}/>)

    let messagesItems = props.messagesData.map(m => <Message senderName={m.name}
                                                             text={m.text}
                                                             senderAva={m.img}/>)
    let text = React.createRef()


    return <>
        <div className={s.dialogsPage}>
            {props.currentDialogId ?
                <div className={s.messageBar}>
                    {messagesItems}
                    <textarea value={props.newMessageText}
                              onChange={() => props.onMessageTextChange(text)} ref={text}
                              name="новое сообщение" id="" cols="30" rows="10"/>
                    <button className={s.sendMessageButton} onClick={() => props.onSendNewMessage()}>Send message
                    </button>
                </div> : null}

            <div className={s.dialogList}>
                <h3>Список диалогов:</h3>
                {dialogsItems}
                <button className={s.addDialogButton}>Start new dialog</button>
            </div>
        </div>
    </>

}

export default DialogsPage;