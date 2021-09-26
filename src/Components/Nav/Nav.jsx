import React from 'react';
import s from "./Nav.module.css"
import {NavLink} from "react-router-dom";

const Nav = (props) => {
    return (
        <nav className={s.nav}>
            <div className={s.navItem}>
                <p><NavLink className={s.link} activeClassName={s.activeLink}
                            to={"/AuthUser/ProfilePage/" + props.myId}>Профиль</NavLink></p>
            </div>
            <div className={s.navItem}>
                <p onClick={() => props.onGoToDialogsPage("")}><NavLink className={s.link}
                                                                        activeClassName={s.activeLink}
                                                                        to="/AuthUser/DialogsPage">Диалоги</NavLink></p>
            </div>
            <div className={s.navItem}>
                <p><NavLink className={s.link} activeClassName={s.activeLink}
                            to="/AuthUser/FriendsPage">Друзья</NavLink></p>
            </div>
            <div className={s.navItem}>
                <p><NavLink className={s.link} activeClassName={s.activeLink} to="/AuthUser/NewsPage">Новости</NavLink>
                </p>
            </div>
            <div className={s.navItem}>
                <p><NavLink className={s.link} activeClassName={s.activeLink}
                            to="/AuthUser/Settings">Настройки</NavLink>
                </p>
            </div>
            <div className={s.navItem}>

                <button className={s.logoutButton} onClick={() => {
                    props.onExit()
                    // window.location.reload();
                }}>
                    Выйти
                    {/*<NavLink className={`${s.link} ${s.logoutLink}`} to="/">Выйти</NavLink>*/}
                </button>

            </div>
        </nav>
    )
}

export default Nav;