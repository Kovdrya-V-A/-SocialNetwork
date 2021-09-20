import React from 'react';
import s from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={'fixed-bottom', s.footer}>
            <div className="container">
                © Vlad-Corporation 2020 — 2021
            </div>
        </footer>
    )
}
export default Footer;