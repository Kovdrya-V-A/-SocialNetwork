import s from './NewsPage.module.css';
import React from 'react';
import News from "./News/News";

const NewsPage = (props) => {

    let newsItems = props.newsData.map(n => <News name={n.name} text={n.text} dateTime={n.dateTime}/>)
    let pagesCount = Math.ceil(props.totalNewsCount / props.pageSize)
    let pageNumbers = []
    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i)
    }
    // console.log (pageNumbers)

    let pageNumbersList = pageNumbers.map((n) => <span
        className={n === props.currentPage ? `${s.selectedPage} ${s.pageNumber}` : s.pageNumber}
        onClick={() => {
            props.onSetCurrentPage(n)
        }}>{n}</span>)

    return (
        <div className={s.newsPage}>
            <div className={s.newsList}>
                {newsItems}
                <div className={s.selectingPageMenu}>{pageNumbersList}</div>
            </div>
        </div>
    )
}

export default NewsPage;