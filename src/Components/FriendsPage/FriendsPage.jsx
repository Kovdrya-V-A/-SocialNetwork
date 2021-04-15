import React from 'react';
import s from "./FriendsPage.module.css"
import {NavLink} from "react-router-dom";
import * as axios from "axios";


class FriendsPage extends React.Component {

    componentDidMount() {
        if (this.props.friendsData.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    this.props.setFriends(response.data.items)
                })
        }
    }

    onUnfollow(userId) {
        this.props.unfollow(userId)
    }

    onFollow (userId) {
        this.props.follow(userId)
    }


    render() {

        let friendItem = this.props.friendsData.map((f) => <div key={f.id}>
            <div className={s.friend}>
                <div className={s.friendAva}>
                    <img src={f.photos.small != null ? f.photos.small : "https://freepikpsd.com/wp-content/uploads/2019/10/user-png-image-9.png"} alt="friendAva"/>
                </div>
                <div className={s.friendInfo}>
                    <NavLink className={s.friendLink}
                             to={"/FriendsPage/" + f.id}>{f.name}</NavLink>
                    <button className={`${s.toMassageButton} ${s.button}`}>Massage</button>
                    {f.followed ?
                        <button onClick={() => this.onUnfollow(f.id)}
                                className={`${s.deleteFromFriendsButton} ${s.button}`}>Unfollow</button> :
                        <button onClick={() => this.onFollow(f.id)}
                                className={`${s.addOnFriendsButton} ${s.button}`}>Follow</button>}
                </div>
            </div>
        </div>)
        return (
            <div className={s.friendsPage}>
                {friendItem}
            </div>
        )
    }
}


export default FriendsPage;