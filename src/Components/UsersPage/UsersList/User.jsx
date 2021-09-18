import s from "../UsersPage.module.css";
import standUserAva from "../../../Assets/standUserAva.png";
import {NavLink} from "react-router-dom";
import React from "react";


const User = (props) => {
    return <div className={s.user}>
        <div className={s.userAva}>
            <img
                src={props.img != null ? props.img : standUserAva}
                alt="userAva"/>
        </div>
        <div className={s.userInfo}>
            <NavLink className={s.userLink}
                     to={"/AuthUser/UserPage/" + props.id}>{props.name}</NavLink>
            <button disabled={props.setIsWroteInProgress.some(id => id === props.id)} onClick={() => {
                props.onMessage(props.id)
            }} className={`${s.toMessageButton} ${s.button}`}>Написать
            </button>
            {props.followed ?
                <button disabled={props.followingInProgress.some(id => id === props.id)}
                        onClick={() => props.onUnfollow(props.id)}
                        className={`${s.unfollowButton} ${s.button}`}>Удалить</button> :
                <button disabled={props.followingInProgress.some(id => id === props.id)}
                        onClick={() => props.onFollow(props.id)}
                        className={`${s.followButton} ${s.button}`}>Добавить</button>}
            {props.followed ? <div className={s.followedStatus}><p>Ваш друг</p></div> : null}
        </div>
    </div>


}

export default User