import React from 'react';
import s from "./UsersPage.module.css"
import {NavLink} from "react-router-dom";
import * as axios from "axios";


class UsersPage extends React.Component {

    componentDidMount() {
        if (this.props.usersData.length === 0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUsers(response.data.items)
                })
        }
    }

    onUnfollow = (userId) => {
        this.props.unfollow(userId)
    }

    onFollow = (userId) => {
        this.props.follow(userId)
    }

    onSetCurrentPage(number) {
        this.props.setCurrentPage(number)
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${number}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUsers(response.data.items)
                })
    }


    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pageNumbers = []
        for (let i = 1; i <= pagesCount; i++) {
            pageNumbers.push(i)
        }
        let pageNumbersList = pageNumbers.map((n) => <span
            className={n === this.props.currentPage ? `${s.selectedPage} ${s.pageNumber}` : s.pageNumber}
            onClick={() => {
                this.onSetCurrentPage(n)
            }}>{n}</span>)

        let userItem = this.props.usersData.map((u) => <div key={u.id}>
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
                        <button onClick={() => this.onUnfollow(u.id)}
                                className={`${s.unfollowButton} ${s.button}`}>Unfollow</button> :
                        <button onClick={() => this.onFollow(u.id)}
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
}


export default UsersPage;