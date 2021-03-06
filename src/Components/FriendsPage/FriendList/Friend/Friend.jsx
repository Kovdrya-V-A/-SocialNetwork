import s from "./Friend.module.css"
import standUserAva from "../../../../Assets/standUserAva.png";
import {NavLink, Redirect} from "react-router-dom";
import React from "react";

const Friend = (props) => {
    if (props.isWrote && props.currentDialogId) {
        return <Redirect to={"/AuthUser/DialogsPage/" + props.currentDialogId}/>
    }


    return (
        <div className={s.friend}>
            <div className={s.friendAva}>
                <img
                    src={props.img != null ? props.img : standUserAva}
                    alt="userAva"/>
            </div>
            <div className={s.friendInfo}>
                <NavLink className={s.friendLink}
                         to={"/AuthUser/ProfilePage/" + props.id}>{`${props.name}`}</NavLink>
                <button disabled={props.isWroteInProgress.some(id => id == props.id)} onClick={() => {
                    props.onMessage(props.id)
                }} className={`${s.toMessageButton} ${s.button}`}>Написать
                </button>
                {props.followed ?
                    <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => props.onUnfollow(props.id)}
                            className={`${s.unfollowButton} ${s.button}`}>Удалить</button> :
                    <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => props.onFollow(props.id)}
                            className={`${s.followButton} ${s.button}`}>Добавить</button>}
                {!props.followed ? <div className={s.followedStatus}><p>Удален из друзей</p></div> : null}
            </div>
        </div>
    )
}

export default React.memo(Friend)