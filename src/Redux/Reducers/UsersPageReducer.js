const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET_USERS";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_IS_WROTE = "SET_IS_WROTE";
const SEARCH_QUERY_TEXT_CHANGE = "const SEARCH_QUERY_TEXT_CHANGE";

let initialUsersPage = {

    searchQueryText: "",
    usersData: [],
    currentPage: 1,
    pageSize: 7,
    totalUsersCount: 0,
    isFetching: false,
    isWrote: false,
};

const usersPageReducer = (usersPage = initialUsersPage, action) => {

    switch (action.type) {

        case SEARCH_QUERY_TEXT_CHANGE: {
            return {
                ...usersPage,
                searchQueryText: action.enteredText
            }
        }

        case UNFOLLOW:
            alert(action.message)
            return {
                ...usersPage,
                usersData: usersPage.usersData.map(f => {
                    if (f.id === action.userId) {
                        return {...f, followed: false}
                    }
                    return f;
                })
            }

        case FOLLOW:
            alert(action.message)
                return {
                    ...usersPage,
                    usersData: usersPage.usersData.map(f => {
                        if (f.id === action.userId) {
                            return {...f, followed: !action.error ? true : false}
                        }
                        return f;
                    })
                }

        case SET_USERS:
            return {
                ...usersPage, usersData: [...action.usersData]
            }

        case SET_CURRENT_PAGE:
            return {
                ...usersPage, currentPage: action.number
            }

        case SET_USERS_TOTAL_COUNT:
            return {
                ...usersPage, totalUsersCount: action.count
            }

        case SET_IS_WROTE:
            return {...usersPage, isWrote: action.isWrote}

        default: {
            return usersPage
        }
    }
}

export const unFollowActionCreator = (userId, message) => {
    return {
        type: UNFOLLOW,
        userId,
        message
    }
}

export const followActionCreator = (userId, message, error) => {
    return {
        type: FOLLOW,
        userId,
        message,
        error,
    }
}

export const setUsersActionCreator = (usersData) => {
    return {
        type: SET_USERS,
        usersData
    }
}

export const setCurrentPageActionCreator = (number) => {
    return {
        type: SET_CURRENT_PAGE,
        number
    }
}
export const setUserTotalCountActionCreator = (count) => {
    return {
        type: SET_USERS_TOTAL_COUNT,
        count
    }
}

export const setIsFetchingActionCreator = (isFetch) => {
    return {
        type: SET_IS_FETCHING,
        isFetch
    }
}
export const setIsWroteActionCreator = (isWrote) => {
    return {
        type: SET_IS_WROTE,
        isWrote
    }
}
export const setSearchQueryTextActionCreator = (enteredText) => {
    return {
        type: SEARCH_QUERY_TEXT_CHANGE,
        enteredText: enteredText.current.value
    }
}


export default usersPageReducer;