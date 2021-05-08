import React from 'react';
import s from "./Nav.module.css"
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
            <nav className={s.nav}>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/AuthUser/ProfilePage">Profile</NavLink>
                </div>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/AuthUser/DialogsPage">Dialogs</NavLink>
                </div>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/AuthUser/FriendsPage">Friends</NavLink>
                </div>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/AuthUser/UsersPage">Users</NavLink>
                </div>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/AuthUser/NewsPage">News</NavLink>
                </div>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/AuthUser/Settings">Settings</NavLink>
                </div>
                <div className={s.navItem}>
                    <button className={s.logoutButton} onClick={() => {window.location.reload()}}><NavLink className={s.link} to ="/">Log out</NavLink></button>
                </div>
            </nav>
    )
}

export default Nav;