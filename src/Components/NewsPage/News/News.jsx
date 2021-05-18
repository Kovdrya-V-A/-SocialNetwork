import s from './News.module.css';
import React from 'react';

const News = (props) => {
    return (
        <div className={s.news}>
            <div className={s.newsContent}>
                <div className={s.name}>
                    <h2>{props.name}</h2>
                </div>
                <div className={s.newsText}>
                    <p>{props.text}</p>
                </div>
                <div className={s.newsDateTime}>
                    <p>{props.dateTime}</p>
                </div>
            </div>

        </div>
    )
}

export default News;