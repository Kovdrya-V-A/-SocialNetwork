import s from "./Message.module.css";
import React from "react";

const Message = (props) => {
    return (
        <div className={s.message}>
            <div className={s.senderAva}>
                <img src={props.senderAva} alt="senderava"/>
            </div>
            <div className={s.messageContent}>
                <div className={s.senderName}>{props.senderName}</div>
                <div className={s.text}><p>{props.text}</p></div>
                <div className={s.time}>{props.time}</div>
            </div>
            <div className={s.deleteMessage}><p onClick={() => props.onDeleteMessage(props.idMessage)}>×</p></div>
        </div>
    )
}

export default Message;