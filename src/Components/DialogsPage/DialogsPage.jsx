import React from 'react';
import s from './DialogsPage.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";

const DialogsPage = (props) => {


    let dialogsItems = props.dialogsData.map(d => d.isDeleted ? null :
        <Dialog
            onSetCurrentDialog={props.onSetCurrentDialog}
            dialogAva={d.img} idDialog={d.idDialog}
            chatName={d.name}
            onDeleteDialog={props.onDeleteDialog}/>)

    let messagesItems = props.messagesData.map(m => m.isDeleted ? null : <Message senderName={m.name}
                                                                                  text={m.text}
                                                                                  senderAva={m.img}
                                                                                  time={m.time}
                                                                                  idMessage={m.id}
                                                                                  onDeleteMessage={props.onDeleteMassage}
                                                                                  id={m.id}
                                                                                  senderId={m.senderId}/>)
    let text = React.createRef()


    return <>
        {!props.currentDialogId ? <Redirect to={"/AuthUser/DialogsPage" + props.currentDialogId}/> : null}
        <div className={s.dialogsPage}>
            {props.currentDialogId ?
                <div className={s.messageBar}>
                    {props.messagesData.length > 0 ? messagesItems :
                        <p className={s.nullMessagesMesssage}>В этом диалоге пока нет сообщений</p>}
                    <textarea value={props.newMessageText}
                              onChange={() => props.onMessageTextChange(text)} placeholder="Ваше сообщение" ref={text}
                              name="новое сообщение" id="" cols="30" rows="10"/>
                    <button className={s.sendMessageButton}
                            onClick={() => props.onSendNewMessage(props.newMessageText)}>Send message
                    </button>
                </div> : null}

            <div className={s.dialogList}>
                <h2>Список диалогов:</h2>
                {props.dialogsData.length > 0 ? dialogsItems :
                    <p>У вас пока нет активых диалогов. Напишите кому - нибудь, и здесь появится диалог.</p>}
            </div>
        </div>
    </>

}

export default DialogsPage;