import s from "./FriendsPage.module.css"
import React from "react";
import {NavLink} from "react-router-dom";
import FriendList from "./FriendList/FriendList";

const FriendsPage = (props) => {
    let pagesCount = Math.ceil(props.totalFriendsCount / props.pageSize)
    let pageNumbers = []
    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i)
    }
    let pageNumbersList = pageNumbers.map((n) => <span
        key={n}
        className={n === props.currentPage ? `${s.selectedPage} ${s.pageNumber}` : s.pageNumber}
        onClick={() => {
            props.onSetCurrentPage(n)
        }}>{n}</span>)

    return (
        <div className={s.friendsPage}>
            <div className={s.searchFriendsButtonWrap}>
                <button className={s.searchFriendsButton}><NavLink className={s.searchFriends} to="/AuthUser/UsersPage">Search
                    new friends</NavLink></button>
            </div>
            <div className={s.usersListArea}><h2>Ваши друзья:</h2><FriendList friendsData={props.friendsData}
                                                                              onMessage={props.onMessage}
                                                                              isWrote={props.isWrote}
                                                                              currentDialogId={props.currentDialogId}
                                                                              onUnfollow={props.onUnfollow}
                                                                              onFollow={props.onFollow}
                                                                              followingInProgress = {props.followingInProgress}/>
            </div>
            <div className={s.selectingPageMenu}>{props.friendsData.length > 0 ? pageNumbersList : null}</div>
        </div>
    )
}

export default FriendsPage