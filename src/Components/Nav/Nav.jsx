import React from 'react';
import s from "./Nav.module.css"
import {NavLink} from "react-router-dom";

const Nav = (props) => {
    return (
        <nav className={s.nav}>
            <div className={s.navItem}>
                <p><NavLink className={s.link} activeClassName={s.activeLink}
                            to="/AuthUser/ProfilePage">Profile</NavLink></p>
            </div>
            <div className={s.navItem}>
                <p onClick={() => props.onGoToDialogsPage("")}><NavLink className={s.link} activeClassName={s.activeLink}
                            to="/AuthUser/DialogsPage">Dialogs</NavLink></p>
            </div>
            <div className={s.navItem}>
                <p><NavLink className={s.link} activeClassName={s.activeLink}
                            to="/AuthUser/FriendsPage">Friends</NavLink></p>
            </div>
            <div className={s.navItem}>
                <p><NavLink className={s.link} activeClassName={s.activeLink} to="/AuthUser/NewsPage">News</NavLink></p>
            </div>
            <div className={s.navItem}>
                <p><NavLink className={s.link} activeClassName={s.activeLink} to="/AuthUser/Settings">Settings</NavLink>
                </p>
            </div>
            <div className={s.navItem}>

                <button className={s.logoutButton} onClick={() => {
                    window.location.reload();
                    localStorage.removeItem("userToken")
                }}><NavLink className={`${s.link} ${s.logoutLink}`} to="/">Log out</NavLink></button>

            </div>
        </nav>
    )
}

export default Nav;