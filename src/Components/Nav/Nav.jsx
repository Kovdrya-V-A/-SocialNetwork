import React from 'react';
import s from "./Nav.module.css"
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
            <nav className={s.nav}>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/ProfilePage">Profile</NavLink>
                </div>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/DialogsPage">Dialogs</NavLink>
                </div>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/FriendsPage">Friends</NavLink>
                </div>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/NewsPage">News</NavLink>
                </div>
                <div className={s.navItem}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/Settings">Settings</NavLink>
                </div>
            </nav>
    )
}

export default Nav;