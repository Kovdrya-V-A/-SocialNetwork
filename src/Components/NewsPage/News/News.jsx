import s from './News.module.css';
import React from 'react';

const News = (props) => {
    return (
        <div className={s.news}>
            <div className={s.newsHeading}>
                <h3>{props.newsHeading}</h3>
            </div>
            <div className={s.newsText}>
                <p>{props.newsText}</p>
            </div>
            <div className={s.newsDate}>
                <h4>{props.newsDate}</h4>
            </div>
        </div>
    )
}

export default News;