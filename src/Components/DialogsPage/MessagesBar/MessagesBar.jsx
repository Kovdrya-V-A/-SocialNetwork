import s from "../DialogsPage.module.css";
import React from "react";
import Message from "./Message/Message";


const MessagesBar = (props) => {


    let messagesItems = props.messagesData.map(m => m.isDeleted ? null : <Message
        deleteMessageInProgress={props.deleteMessageInProgress}
        key={m.id}
        senderName={m.name}
        text={m.text}
        senderAva={m.img}
        time={m.time}
        idMessage={m.id}
        onDeleteMessage={props.onDeleteMassage}
        id={m.id}
        senderId={m.senderId}/>)
    let text = React.createRef()

    return (
        <div className={s.messageBar}>
            {props.messagesData.length > 0 ? messagesItems :
                <p className={s.nullMessagesMessage}>В этом диалоге пока нет сообщений</p>}
            <textarea value={props.newMessageText}
                      onChange={() => props.onMessageTextChange(text)} placeholder="Ваше сообщение" ref={text}
                      name="новое сообщение" id="" cols="30" rows="10"/>
            <button className={s.sendMessageButton}
                    onClick={() => props.onSendNewMessage(props.newMessageText)}>Send message
            </button>
        </div>
    )
}
export default MessagesBar