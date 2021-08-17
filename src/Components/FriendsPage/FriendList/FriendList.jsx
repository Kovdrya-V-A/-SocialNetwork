import s from "../FriendsPage.module.css";
import React from "react";
import Friend from "./Friend/Friend";


const FriendList = (props) => {

    let friendsItems = props.friendsData.map((f) =>
        <Friend
            key={f.id}
            img={f.img}
            id={f.id}
            name={f.name}
            onMessage={props.onMessage}
            isWrote={props.isWrote}
            currentDialogId={props.currentDialogId}
            onUnfollow={props.onUnfollow}
            onFollow={props.onFollow}
            followed={f.followed}/>
    )

    return (
        <div className={s.friendList}>
            {props.friendsData.length > 0 ? friendsItems : "У вас пока нет друзей"}
        </div>
    )
}

export default FriendList


