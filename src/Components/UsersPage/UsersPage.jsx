import s from "./UsersPage.module.css"
import React from "react";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import UsersList from "./UsersList/UsersList";
import Pagination from "../Pagination";

const UsersPage = (props) => {
    if (props.isWrote && props.currentDialogId) {
        return <Redirect to={"/AuthUser/DialogsPage/" + props.currentDialogId}/>
    }

    const onSubmit = (formData) => {
        props.onSearchUsers(formData.searchText ? formData.searchText : "")
    }

    return (
        <div className={s.usersPage}>
            <ReduxSearchUsersForm searchUsersInProgress={props.searchUsersInProgress} onSubmit={onSubmit}/>
            <div className={s.usersListBar}><h2>Список пользователей:</h2>
                <UsersList usersData={props.usersData}
                           setIsWroteInProgress={props.setIsWroteInProgress}
                           onMessage={props.onMessage}
                           followingInProgress={props.followingInProgress}
                           onUnfollow={props.onUnfollow}
                           onFollow={props.onFollow}/>
            </div>
            <div className={s.selectingPageMenu}><Pagination totalCount = {props.totalUsersCount}
                                                             pageSize = {props.pageSize}
                                                             currentPage = {props.currentPage}
                                                             setCurrentPage = {props.onSetCurrentPage}/></div>
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