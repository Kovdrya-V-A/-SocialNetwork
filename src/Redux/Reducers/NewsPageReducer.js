import {getNewsRequest} from "../../DAL/ApiRequests";

const SET_NEWS = "SET_NEWS";
const SET_CURRENT_NEWS_PAGE = "SET_CURRENT_NEWS_PAGE";
const SET_NEWS_TOTAL_COUNT = "SET_NEWS_TOTAL_COUNT";
let initialNewsPage = {
    newsData: [],
    currentPage: 1,
    pageSize: 10,
    totalNewsCount: 0,
};

const newsPageReducer = (newsPage = initialNewsPage, action) => {
    switch (action.type) {

        case SET_NEWS:
            return {
                ...newsPage, newsData: [...action.newsData]
            }

        case SET_CURRENT_NEWS_PAGE:
            return {
                ...newsPage, currentPage: action.number
            }

        case SET_NEWS_TOTAL_COUNT:
            return {
                ...newsPage, totalNewsCount: action.count
            }

        default:
            return newsPage;
    }
}


export const setNews = (newsData) => {
    return {
        type: SET_NEWS,
        newsData
    }
}

export const setCurrentPage = (number) => {
    return {
        type: SET_CURRENT_NEWS_PAGE,
        number
    }
}

export const setNewsTotalCount = (count) => {
    return {
        type: SET_NEWS_TOTAL_COUNT,
        count
    }
}

export const setNewsThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        const data = await getNewsRequest(currentPage, pageSize)
        if (data) {
            dispatch(setNews(data.items))
            dispatch(setNewsTotalCount(data.totalCount))
        }
    }
}

export const setCurrentPageThunkCreator = (number, pageSize) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(number))
        const data = await getNewsRequest(number, pageSize)
        dispatch(setNews(data.items))
        dispatch(setNewsTotalCount(data.totalCount))
    }
}

export default newsPageReducer;




