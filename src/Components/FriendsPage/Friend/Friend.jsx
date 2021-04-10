import React from 'react';
import s from "./Friend.module.css"
import {NavLink} from "react-router-dom";

const Friend = (props) => {
    let userId = props.key;

    let onUnfollow = (userId) => {
        props.unfollow(userId)}

    let onFollow = (userId) => {
        props.follow(userId)
    }

    return (
        <div className={s.friend}>
            <div className={s.friendAva}>
                <img src={props.friendAva} alt="friendava"/>
            </div>
            <div className={s.friendInfo}>
                <NavLink className={s.friendLink}
                         to={"/FriendsPage/" + props.key}>{props.name}</NavLink>
                <button className={`${s.toMassageButton} ${s.button}`}>Massage</button>
                {props.followed ?
                    <button onClick={onUnfollow} className={`${s.deleteFromFriendsButton} ${s.button}`}>Unfollow</button> :
                    <button onClick={onFollow} className={`${s.addOnFriendsButton} ${s.button}`}>Follow</button>}
            </div>
        </div>
    )
}

export default Friend;