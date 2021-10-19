import s from "./Message.module.css";
import React from "react";
import {NavLink} from "react-router-dom";

const Message = (props) => {
    return (
        <div className={s.wrapper}>
            <div className={s.senderAva}>
                <img src={props.senderAva} alt="senderava"/>
            </div>
            <div className={s.messageContent}>

                <div className={s.senderName}>
                    <NavLink className={s.senderLink}
                                to={"/AuthUser/ProfilePage/" + props.senderId}>{props.senderName}</NavLink>
                </div>
                <div className={s.text}><p>{props.text}</p></div>
                <div className={s.time}>{props.time}</div>
            </div>
            <div className={s.deleteMessage}><button disabled={props.deleteMessageInProgress} onClick={() => props.onDeleteMessage(props.idMessage)}><p>×</p></button></div>
        </div>
    )
}

export default React.memo(Message);