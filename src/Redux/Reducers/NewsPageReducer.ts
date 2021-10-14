import {getNewsRequest} from "../../DAL/ApiRequests";

const SET_NEWS = "SET_NEWS";
const SET_CURRENT_NEWS_PAGE = "SET_CURRENT_NEWS_PAGE";
const SET_NEWS_TOTAL_COUNT = "SET_NEWS_TOTAL_COUNT";

let initialNewsPage = {
    newsData: [] as Array<NewsType>,
    currentPage: 1 as number,
    pageSize: 10 as number,
    totalNewsCount: 0 as number,
};

export type initialStateType = typeof initialNewsPage

export type NewsType = {
    text: string,
    idPost: number,
    dateTime: string,
    name: string,
    img: string,
    resourceId: number
}

const newsPageReducer = (newsPage = initialNewsPage, action:any): initialStateType => {
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


export const setNews = (newsData: Array<NewsType>) => {
    return {
        type: SET_NEWS,
        newsData
    }
}

export const setCurrentPage = (number: number) => {
    return {
        type: SET_CURRENT_NEWS_PAGE,
        number
    }
}

export const setNewsTotalCount = (count: number) => {
    return {
        type: SET_NEWS_TOTAL_COUNT,
        count
    }
}

export const setNewsThunkCreator = (currentPage: number, pageSize: number) => {
    return async (dispatch: Function) => {
        const data = await getNewsRequest(currentPage, pageSize)
        if (data) {
            dispatch(setNews(data.items))
            dispatch(setNewsTotalCount(data.totalCount))
        }
    }
}

export const setCurrentPageThunkCreator = (number: number, pageSize: number) => {
    return async (dispatch: Function) => {
        dispatch(setCurrentPage(number))
        const data = await getNewsRequest(number, pageSize)
        dispatch(setNews(data.items))
        dispatch(setNewsTotalCount(data.totalCount))
    }
}

export default newsPageReducer;




