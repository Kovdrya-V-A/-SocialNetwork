import React from 'react';
import s from "./Header.module.css";

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.logo}><img src='https://wonder-day.com/wp-content/uploads/2020/10/wonder-day-among-us-21.png'/></div>
        </header>
    );
}
export default Header;