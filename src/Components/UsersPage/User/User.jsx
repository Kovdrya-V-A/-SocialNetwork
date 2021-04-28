import React from 'react';
import s from "./User.module.css"
import {NavLink} from "react-router-dom";

const User = (props) => {
    // let userId = props.key;

    let onUnfollow = (userId) => {
        props.unfollow(userId)}

    let onFollow = (userId) => {
        props.follow(userId)
    }

    return (
        <div className={s.user}>
            <div className={s.userAva}>
                <img src={props.userAva} alt="userava"/>
            </div>
            <div className={s.userInfo}>
                <NavLink className={s.userLink}
                         to={"/UsersPage/" + props.key}>{props.name}</NavLink>
                <button className={`${s.toMessageButton} ${s.button}`}>Message</button>
                {props.followed ?
                    <button onClick={onUnfollow} className={`${s.unfollowButton } ${s.button}`}>Unfollow</button> :
                    <button onClick={onFollow} className={`${s.followButton} ${s.button}`}>Follow</button>}
            </div>
        </div>
    )
}

export default User;