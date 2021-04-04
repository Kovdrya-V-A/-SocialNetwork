import s from './NewsPage.module.css';
import React from 'react';
import News from "./News/News";


const NewsPage = (props) => {
    let newsItems = props.newsPage.newsData.map(n => <News newsHeading = {n.newsHeading} newsText = {n.newsText} newsDate = {n.newsDate}/>)
    return (
        <div className={s.newsPage}>
            <div className={s.newsList}>
                {newsItems}
            </div>
        </div>
    )
}

export default NewsPage;