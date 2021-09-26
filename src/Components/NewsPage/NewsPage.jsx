import s from './NewsPage.module.css';
import React from 'react';
import News from "./News/News";
import Pagination from "../Pagination";

const NewsPage = (props) => {

    let newsItems = props.newsData.map(n => {
        return <News key={n.idPost}
                     id={n.idPost}
                     resourceId={n.resourceId} img={n.img}
                     name={n.name} text={n.text}
                     dateTime={n.dateTime}/>
    })

    return (
        <div className={s.newsPage}>
            <div className={s.newsList}>
                {newsItems}
                <div className={s.selectingPageMenu}><Pagination totalCount={props.totalNewsCount}
                                                                 pageSize={props.pageSize}
                                                                 currentPage={props.currentPage}
                                                                 setCurrentPage={props.onSetCurrentPage}/></div>
            </div>
        </div>
    )
}

export default React.memo(NewsPage);