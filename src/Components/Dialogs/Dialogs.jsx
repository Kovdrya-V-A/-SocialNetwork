import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink className={s.dialogLink} activeClassName={s.activeDialog}
                     to={"/Dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    )
}

const Massage = (props) => {
    return (
        <div className={s.massage}>
            {props.text}
        </div>
    )
}

let dialogsData = [
    {id: 1, name: "Ваня"},
    {id: 2, name: "Таня"},
    {id: 3, name: "Саша"},
    {id: 4, name: "Олег"},
    {id: 5, name: "Дима"},
    {id: 6, name: "Чорт"}

]
let massageData = [
    {id: 1, massage: "Привет !"},
    {id: 2, massage: "Как дела ?"},
    {id: 3, massage: "Да"},
    {id: 4, massage: "Что да ?"},
    {id: 5, massage: "Да"},
    {id: 6, massage: "М-да"}
]

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.massageBar}>
                <Massage text={massageData[0].massage}/>
                <Massage text={massageData[1].massage}/>
                <Massage text={massageData[2].massage}/>
                <Massage text={massageData[3].massage}/>
                <Massage text={massageData[4].massage}/>
                <Massage text={massageData[5].massage}/>
                <button>Send message</button>
            </div>
            <div className={s.dialogList}>
                <Dialog name={dialogsData[0].name} id={dialogsData[0].id}/>
                <Dialog name={dialogsData[1].name} id={dialogsData[1].id}/>
                <Dialog name={dialogsData[2].name} id={dialogsData[2].id}/>
                <Dialog name={dialogsData[3].name} id={dialogsData[3].id}/>
                <Dialog name={dialogsData[4].name} id={dialogsData[4].id}/>
                <Dialog name={dialogsData[5].name} id={dialogsData[5].id}/>
                <button>Start new dialog</button>
            </div>
        </div>
    )
}

export default Dialogs;