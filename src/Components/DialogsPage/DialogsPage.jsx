import React from 'react';
import s from './DialogsPage.module.css'
import Dialog from "./Dialog/Dialog";
import Massage from "./Massage/Massage";

const DialogsPage = (props) => {

    let dialogsItems = props.dialogsPage.dialogsData.map(d => <Dialog dialogAva={d.dialogAva} id={d.id} name={d.name}/>)
    let massagesItems = props.dialogsPage.massagesData.map(m => <Massage senderName={m.senderName}
                                                                         senderAva={m.senderAva} id={m.id}
                                                                         text={m.massage}/>)

    let text = React.createRef()

    let onSendNewMassage = () => {
        props.sendNewMassage();
    }
    let onMassageTextChange = () => {
        props.massageTextChange(text)
    }

    return (
        <div className={s.dialogsPage}>
            <div className={s.massageBar}>
                {massagesItems}
                <textarea value={props.dialogsPage.newMassageText} onChange={onMassageTextChange} ref={text}
                          name="новое сообщение" id="" cols="30" rows="10"/>
                <button onClick={onSendNewMassage}>Send message</button>
            </div>
            <div className={s.dialogList}>
                {dialogsItems}
                <button>Start new dialog</button>
            </div>
        </div>
    )
}

export default DialogsPage;