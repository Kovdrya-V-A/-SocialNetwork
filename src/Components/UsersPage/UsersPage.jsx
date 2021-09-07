import s from "./UsersPage.module.css"
import React, {createRef} from "react";
import {NavLink, Redirect} from "react-router-dom";
import standUserAva from "../../Assets/standUserAva.png"
import {Field, reduxForm} from "redux-form";

const UsersPage = (props) => {
    if (props.isWrote && props.currentDialogId) {
        return <Redirect to={"/AuthUser/DialogsPage/" + props.currentDialogId}/>
    }

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

    const onSubmit = (formData) => {
        props.onSearchUsers(formData.searchText ? formData.searchText : "")
    }

    return (
        <div className={s.usersPage}>
            <ReduxSearchUsersForm searchUsersInProgress = {props.searchUsersInProgress} onSubmit={onSubmit}/>
            <div className={s.usersList}><h2>Список пользователей:</h2>
                {props.usersData.length > 0 ? userItem : <h2>Такой пользователь не найден</h2>}
            </div>
            <div className={s.selectingPageMenu}>{pageNumbersList}</div>
        </div>
    )
}

const SearchUsersForm = (props) => {
    return <form className={s.searchUsersForm} onSubmit={props.handleSubmit}>
        <div className={s.searchTextArea}>
            <Field
                className={s.inputSearchText}
                name="searchText" component={"textarea"}/></div>
        <div className={s.searchButtonWrap}>
            <button disabled={props.searchUsersInProgress}
                    className={s.searchButton}>Search
            </button>
        </div>
    </form>
}

const ReduxSearchUsersForm = reduxForm({
    form: "searchUsers"
})(SearchUsersForm)


export default React.memo(UsersPage)