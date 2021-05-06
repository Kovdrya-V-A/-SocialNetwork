import s from "./UsersPage.module.css"
import React from "react";
import {NavLink, Redirect} from "react-router-dom";
import standUserAva from "../../Assets/standUserAva.png"

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
    let userItem = props.usersData.map((u) => {
        // let dialogWithUserLink = `/AuthUser/DialogsPage/${u.id}`
        return (<div key={u.id}>
            <div className={s.user}>
                <div className={s.userAva}>
                    <img
                        src={u.img != null ? u.img : standUserAva}
                        alt="userAva"/>
                </div>
                <div className={s.userInfo}>
                    <NavLink className={s.userLink}
                             to={"/AuthUser/UserPage/" + u.id}>{`${u.firstName} ${u.lastName}`}</NavLink>
                    <button onClick={() => {
                        props.onMessage(u.id)
                    }} className={`${s.toMessageButton} ${s.button}`}>Message
                    </button>
                    {
                        props.isWrote ? <Redirect to="/AuthUser/DialogsPage"/> : null
                    }
                    {u.followed ?
                        <button onClick={() => props.onUnfollow(u.id)}
                                className={`${s.unfollowButton} ${s.button}`}>Unfollow</button> :
                        <button onClick={() => props.onFollow(u.id)}
                                className={`${s.followButton} ${s.button}`}>Follow</button>}
                </div>
            </div>
        </div>)
    })

    return (
        <div className={s.usersPage}>
            {userItem}
            <div className={s.selectingPageMenu}>{pageNumbersList}</div>

        </div>
    )
}

export default UsersPage