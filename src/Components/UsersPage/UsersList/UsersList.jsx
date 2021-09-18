import s from "../UsersPage.module.css";
import React from "react";
import User from "./User";


const UsersList = (props) => {

    let userItems = props.usersData.map((u) => {
        return <User key={u.id} id={u.id} img={u.img} name={u.name} followed={u.followed}
                     setIsWroteInProgress={props.setIsWroteInProgress}
                     onMessage={props.onMessage}
                     followingInProgress={props.followingInProgress}
                     onUnfollow={props.onUnfollow}
                     onFollow={props.onFollow}/>
    })

    return <div className={s.usersList}>
        {props.usersData.length > 0 ? userItems : <h2>Такой пользователь не найден</h2>}
    </div>
}

export default UsersList