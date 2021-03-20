import React from 'react';
import s from "./Nav.module.css"
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
            <nav className={s.nav}>
                <div className={s.item}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/Profile">Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/Dialogs">Dialogs</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/News">News</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink className={s.link} activeClassName = {s.activeLink} to ="/Settings">Settings</NavLink>
                </div>
            </nav>
    )
}

export default Nav;