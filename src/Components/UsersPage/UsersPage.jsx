import s from "./UsersPage.module.css"
import React, {createRef} from "react";
import {NavLink, Redirect} from "react-router-dom";
import standUserAva from "../../Assets/standUserAva.png"

const UsersPage = (props) => {
    let searchText = React.createRef()
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
        return (<div key={u.id}>
            <div className={s.user}>
                <div className={s.userAva}>
                    <img
                        src={u.img != null ? u.img : standUserAva}
                        alt="userAva"/>
                </div>
                <div className={s.userInfo}>
                    <NavLink className={s.userLink}
                             to={"/AuthUser/UserPage/" + u.id}>{`${u.name}`}</NavLink>
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
                    {u.followed ? <div className={s.followedStatus}><p>Ваш друг.</p></div> : null}
                </div>
            </div>
        </div>)
    })

    return (
        <div className={s.usersPage}>
            <div className={s.searchArea}>
                <div><p>Найти пользователя:</p>
                    <textarea
                        ref={searchText}
                        className={s.inputSearchText}
                        onChange={() => props.onSetSearchQueryText(searchText)}
                        value={props.searchQueryText}
                        name="searchTextArea" id="" cols="10" rows="5"/></div>
                <div>
                    <button onClick={() => props.searchQueryText ? props.onSearchUsers(props.searchQueryText):null} className={s.searchButton}>Search</button>
                </div>
            </div>
            <div className={s.usersList}><h3>Список пользователей:</h3>
                {props.usersData.length > 0 ? userItem : "Такой пользователь не найден"}
                </div>
            <div className={s.selectingPageMenu}>{pageNumbersList}</div>
        </div>
    )
}

export default UsersPage