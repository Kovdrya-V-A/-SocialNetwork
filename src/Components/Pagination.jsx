import s from "./UsersPage/UsersPage.module.css";
import React, {useState} from "react";

const Pagination = (props) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pageNumbers = []
    let portionSize = 5
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)

    let leftPortionBorder = (portionNumber - 1) * portionSize + 1
    let rightPortionBorder = portionNumber * portionSize

    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i)
    }
    let pageNumbersList = pageNumbers
        .filter((n) => n >= leftPortionBorder && n <= rightPortionBorder)
        .map((n) => <span
            key={n}
            className={n === props.currentPage ? `${s.selectedPage} ${s.pageNumber}` : s.pageNumber}
            onClick={() => {
                props.setCurrentPage(n)
            }}>{n}</span>)

    return <div>
        {portionNumber > 1 ?
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
                props.setCurrentPage(leftPortionBorder - 1)
            }}>{`<<`}</button> : null}
        {pageNumbersList}
        {portionNumber < portionCount ?
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
                props.setCurrentPage(rightPortionBorder + 1)
            }}>{`>>`}</button> : null}
    </div>
}

export default Pagination