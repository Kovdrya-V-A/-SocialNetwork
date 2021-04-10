import React from 'react';
import s from "./FriendsPage.module.css"
import {NavLink} from "react-router-dom";


const FriendsPage = (props) => {

    let friendItem = props.friendsData.map((f) => <div key={f.id}>
        <div className={s.friend}>
            <div className={s.friendAva}>
                <img src={f.friendAva} alt="friendAva"/>
            </div>
            <div className={s.friendInfo}>
                <NavLink className={s.friendLink}
                         to={"/FriendsPage/" + f.id}>{f.name}</NavLink>
                <button className={`${s.toMassageButton} ${s.button}`}>Massage</button>
                {f.followed ?
                    <button onClick={() => props.unfollow(f.id)} className={`${s.deleteFromFriendsButton} ${s.button}`}>Unfollow</button> :
                    <button onClick={() => props.follow(f.id)} className={`${s.addOnFriendsButton} ${s.button}`}>Follow</button>}
            </div>
        </div>
    </div>)
    return (
        <div className={s.friendsPage}>
            {friendItem}
        </div>
    )
}


export default FriendsPage;