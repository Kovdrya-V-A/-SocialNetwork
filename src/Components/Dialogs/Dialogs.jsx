import React from 'react';
import s from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import Massage from "./Massage/Massage";


const Dialogs = (props) => {

    let dialogsItems = props.dialogsPage.dialogsData.map(d => <Dialog dialogAva={d.dialogAva} id={d.id} name={d.name}/>)

    let massagesItems = props.dialogsPage.massagesData.map(m => <Massage senderName={m.senderName} senderAva={m.senderAva}
                                                                   id={m.id} text={m.massage}/>)
    let sendNewMassage = () => {
        props.sendMassage();
        }


    let newMassage = React.createRef()
    let onMassageTextChange = () => {
        let enteredMassageText = newMassage.current.value;
        props.massageTextChange (enteredMassageText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.massageBar}>
                {massagesItems}
                <textarea value={props.dialogsPage.newMassageText} onChange={onMassageTextChange} ref={newMassage} name="новое сообщение" id="" cols="30" rows="10"></textarea>
                <button onClick={sendNewMassage}>Send message</button>
            </div>
            <div className={s.dialogList}>
                {dialogsItems}
                <button>Start new dialog</button>
            </div>
        </div>
    )
}

export default Dialogs;