import s from "./UsersPage.module.css"
import React from "react";
import {NavLink} from "react-router-dom";

const UsersPage = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pageNumbers = []
    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i)
    }
    let pageNumbersList = pageNumbers.map((n) => <span
        className={n === props.currentPage ? `${s.selectedPage} ${s.pageNumber}` : s.pageNumber}
        onClick={() => {
            props.onSetCurrentPage(n)
        }}>{n}</span>)

    let userItem = props.usersData.map((u) => <div key={u.id}>
        <div className={s.user}>
            <div className={s.userAva}>
                <img
                    src={u.photos.small != null ? u.photos.small : "https://freepikpsd.com/wp-content/uploads/2019/10/user-png-image-9.png"}
                    alt="userAva"/>
            </div>
            <div className={s.userInfo}>
                <NavLink className={s.userLink}
                         to={"/UsersPage/" + u.id}>{u.name}</NavLink>
                <button className={`${s.toMessageButton} ${s.button}`}>Message</button>
                {u.followed ?
                    <button onClick={() => props.onUnfollow(u.id)}
                            className={`${s.unfollowButton} ${s.button}`}>Unfollow</button> :
                    <button onClick={() => props.onFollow(u.id)}
                            className={`${s.followButton} ${s.button}`}>Follow</button>}
            </div>
        </div>
    </div>)

    return (
        <div className={s.usersPage}>
            {userItem}
            <div className={s.selectingPageMenu}>{pageNumbersList}</div>

        </div>
    )
}

export default UsersPage