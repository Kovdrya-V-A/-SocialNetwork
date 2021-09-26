import s from "./FriendsPage.module.css"
import React from "react";
import {NavLink} from "react-router-dom";
import FriendList from "./FriendList/FriendList";
import Pagination from "../Pagination";

const FriendsPage = (props) => {

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
                                                                              followingInProgress={props.followingInProgress}
                                                                              isWroteInProgress={props.isWroteInProgress}/>
            </div>
            <div className={s.selectingPageMenu}>{props.friendsData.length > 0 ?
                <Pagination totalCount={props.totalFriendsCount}
                            pageSize={props.pageSize}
                            currentPage={props.currentPage}
                            setCurrentPage={props.onSetCurrentPage}/> : null}</div>
        </div>
    )
}

export default React.memo(FriendsPage)