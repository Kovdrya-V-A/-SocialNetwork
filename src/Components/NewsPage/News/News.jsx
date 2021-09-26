import s from './News.module.css';
import React from 'react';
import {NavLink} from "react-router-dom";

const News = (props) => {
    return (
        <div className={s.news}>

            <div className={s.avaNews}>
                <img src={props.img} alt="avaNews"/>
            </div>
            <div className={s.newsContent}>
                <div className={s.resourceName}>
                    <NavLink className={s.resourceLink}
                             to={"/AuthUser/ProfilePage/" + props.resourceId}><h2>{props.name}</h2></NavLink>
                </div>
                <div className={s.newsText}>
                    <p>{props.text}</p>
                </div>
                <div className={s.dateTime}>
                    <p>{props.dateTime}</p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(News);