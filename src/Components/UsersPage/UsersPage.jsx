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
        key={n}
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
                             to={"/AuthUser/UserPage/" + u.id}>{u.name}</NavLink>
                    <button disabled={props.setIsWroteInProgress.some(id => id === u.id)} onClick={() => {
                        props.onMessage(u.id)
                    }} className={`${s.toMessageButton} ${s.button}`}>Написать
                    </button>
                    {
                        props.isWrote && props.currentDialogId ?
                            <Redirect to={"/AuthUser/DialogsPage/" + props.currentDialogId}/> : null
                    }
                    {u.followed ?
                        <button disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => props.onUnfollow(u.id)}
                                className={`${s.unfollowButton} ${s.button}`}>Удалить</button> :
                        <button disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => props.onFollow(u.id)}
                                className={`${s.followButton} ${s.button}`}>Добавить</button>}
                    {u.followed ? <div className={s.followedStatus}><p>Ваш друг</p></div> : null}
                </div>
            </div>
        </div>)
    })

    return (
        <div className={s.usersPage}>
            <div className={s.searchArea}>
                <div className={s.searchTextArea}>
                    <textarea
                        ref={searchText}
                        className={s.inputSearchText}
                        onChange={() => props.onSetSearchQueryText(searchText)}
                        value={props.searchQueryText}
                        name="searchTextArea" id="" cols="10" rows="5"/></div>
                <div className={s.searchButtonWrap}>
                    <button disabled={props.searchUsersInProgress}
                            onClick={() => props.searchQueryText ? props.onSearchUsers(props.searchQueryText) : null}
                            className={s.searchButton}>Search
                    </button>
                </div>
            </div>
            <div className={s.usersList}><h2>Список пользователей:</h2>
                {props.usersData.length > 0 ? userItem : <h2>Такой пользователь не найден</h2>}
            </div>
            <div className={s.selectingPageMenu}>{pageNumbersList}</div>
        </div>
    )
}

export default UsersPage