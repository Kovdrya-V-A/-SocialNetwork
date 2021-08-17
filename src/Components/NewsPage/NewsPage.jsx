import s from './NewsPage.module.css';
import React from 'react';
import News from "./News/News";

const NewsPage = (props) => {

    let newsItems = props.newsData.map(n => <News  key = {n.idPost} id={n.idPost} resourceId={n.resourceId} img={n.img} name={n.name} text={n.text} dateTime={n.dateTime}/>)
    let pagesCount = Math.ceil(props.totalNewsCount / props.pageSize)
    let pageNumbers = []
    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i)
    }

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