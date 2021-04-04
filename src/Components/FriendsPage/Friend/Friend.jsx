import React from 'react';
import s from "./Friend.module.css"
import {NavLink} from "react-router-dom";

const Friend = (props) => {
    return (
        <div className={s.friend}>
            <div className={s.friendAva}>
                <img src={props.friendAva} alt="friendava"/>
            </div>
            <div className={s.friendInfo}>
                <NavLink className={s.friendLink}
                         to={"/FriendsPage/" + props.id}>{props.name}</NavLink>
                <button className={s.toMassageButton}>Massage</button>
            </div>
        </div>
    )
}

export default Friend;