import React from 'react';
import s from './DialogsPage.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";

const DialogsPage = (props) => {

    let dialogsItems = props.dialogsData.map(d => <Dialog dialogAva={d.dialogAva} id={d.id}
                                                          name={d.name}/>)

    let messagesItems = props.messagesData.map(m => <Message senderName={m.senderName}
                                                             text={m.message}
                                                             senderAva={m.senderAva}/>)
    let text = React.createRef()


    return (
        <div className={s.dialogsPage}>
            <div className={s.messageBar}>
                {messagesItems}
                <textarea value={props.newMessageText}
                          onChange={() => props.onMessageTextChange(text)} ref={text}
                          name="новое сообщение" id="" cols="30" rows="10"/>
                <button className={s.sendMessageButton} onClick={() => props.onSendNewMessage()}>Send message</button>
            </div>
            <div className={s.dialogList}>
                {dialogsItems}
                <button className={s.addDialogButton}>Start new dialog</button>
            </div>
        </div>
    )

}

export default DialogsPage;