import s from "./FriendsPage.module.css"
import React from "react";
import {NavLink, Redirect} from "react-router-dom";
import standUserAva from "../../Assets/standUserAva.png"

const FriendsPage = (props) => {
    let pagesCount = Math.ceil(props.totalFriendsCount / props.pageSize)
    let pageNumbers = []
    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i)
    }
    let pageNumbersList = pageNumbers.map((n) => <span
        className={n === props.currentPage ? `${s.selectedPage} ${s.pageNumber}` : s.pageNumber}
        onClick={() => {
            props.onSetCurrentPage(n)
        }}>{n}</span>)
    let friendsItems = props.friendsData.map((f) => {
        return (<div key={f.id}>
            <div className={s.friend}>
                <div className={s.friendAva}>
                    <img
                        src={f.img != null ? f.img : standUserAva}
                        alt="userAva"/>
                </div>
                <div className={s.friendInfo}>
                    <NavLink className={s.friendLink}
                             to={"/AuthUser/UserPage/" + f.id}>{`${f.name}`}</NavLink>
                    <button onClick={() => {
                        props.onMessage(f.id)
                    }} className={`${s.toMessageButton} ${s.button}`}>Message
                    </button>
                    {
                        props.isWrote ? <Redirect to="/AuthUser/DialogsPage"/> : null
                    }
                    {f.followed ?
                        <button onClick={() => props.onUnfollow(f.id)}
                                className={`${s.unfollowButton} ${s.button}`}>Unfollow</button> :
                        <button onClick={() => props.onFollow(f.id)}
                                className={`${s.followButton} ${s.button}`}>Follow</button>}
                    {!f.followed ? <div className={s.followedStatus}><p>Удален из друзей</p></div> : null}
                </div>
            </div>
        </div>)
    })

    return (
        <div className={s.friendsPage}>
            <div className={s.searchFriendsButtonWrap}><button className={s.searchFriendsButton}><NavLink className={s.searchFriends} to="/AuthUser/UsersPage">Search new friends</NavLink></button></div>
            <div className={s.usersListArea}><h2>Ваши друзья:</h2>{props.friendsData.length > 0 ? friendsItems : "У вас пока нет друзей"}</div>
            <div className={s.selectingPageMenu}>{props.friendsData.length > 0 ? pageNumbersList : null}</div>

        </div>
    )
}

export default FriendsPage