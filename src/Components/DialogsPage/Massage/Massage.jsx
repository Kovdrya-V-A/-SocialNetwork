import s from "./Massage.module.css";
import React from "react";

const Massage = (props) => {
    return (
        <div className={s.massage}>
            <div className={s.senderAva}>
                <img src={props.senderAva} alt="senderava"/>
            </div>
            <div className={s.massageContent}>
                <div className={s.senderName}>{props.senderName}</div>
                <div className={s.text}>{props.text}</div>
            </div>
        </div>
    )
}

export default Massage;