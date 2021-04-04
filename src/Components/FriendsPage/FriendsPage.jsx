import React from 'react';
import s from "./FriendsPage.module.css"
import Friend from "./Friend/Friend";


const FriendsPage = (props) => {
    let friendItem = props.friendsPage.friendsData.map((f) => <Friend friendAva = {f.friendAva} name = {f.name} id = {f.id}/>)
    return (
        <div className={s.friendsPage}>
            {friendItem}
        </div>
    )
}


export default FriendsPage;