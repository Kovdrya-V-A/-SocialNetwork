const SET_NEWS = "SET_NEWS";
const SET_CURRENT_NEWS_PAGE = "SET_CURRENT_NEWS_PAGE";
const SET_NEWS_TOTAL_COUNT = "SET_NEWS_TOTAL_COUNT";
// const SET_IS_FETCHING = "SET_IS_FETCHING";
let initialNewsPage = {
    newsData: [],
    currentPage: 1,
    pageSize: 7,
    totalNewsCount: 0,
    // isFetching: false,
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



export const setNewsActionCreator = (newsData) => {
    return {
        type: SET_NEWS,
        newsData
    }
}

export const setCurrentPageActionCreator = (number) => {
    return {
        type: SET_CURRENT_NEWS_PAGE,
        number
    }
}

export const setNewsTotalCountActionCreator = (count) => {
    return {
        type: SET_NEWS_TOTAL_COUNT,
        count
    }
}

export default newsPageReducer;




