const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET_USERS";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const SET_CURRENT_USERS_PAGE = "SET_CURRENT_USERS_PAGE";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_IS_WROTE = "SET_IS_WROTE";
const SEARCH_QUERY_TEXT_CHANGE = "const SEARCH_QUERY_TEXT_CHANGE";
const TOGGLE_SET_IS_WROTE_PROGRESS = "TOGGLE_SET_IS_WROTE_PROGRESS";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";
const TOGGLE_SEARCH_USERS_PROGRESS = "TOGGLE_SEARCH_USERS_PROGRESS"

let initialUsersPage = {

    searchQueryText: "",
    usersData: [],
    currentPage: 1,
    pageSize: 7,
    totalUsersCount: 0,
    isFetching: false,
    isWrote: false,
    followingInProgress: false,
    setIsWroteInProgress: false,
    searchUsersInProgress: false,
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

        case SET_CURRENT_USERS_PAGE:
            return {
                ...usersPage, currentPage: action.number
            }

        case SET_USERS_TOTAL_COUNT:
            return {
                ...usersPage, totalUsersCount: action.count
            }

        case SET_IS_WROTE:
            return {...usersPage, isWrote: action.isWrote}

        case TOGGLE_SET_IS_WROTE_PROGRESS:
            return {
                ...usersPage,
                setIsWroteInProgress: action.setIsWroteInProgress
            }

        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...usersPage,
                followingInProgress: action.followingInProgress
            }
        case TOGGLE_SEARCH_USERS_PROGRESS:
            return {
                ...usersPage,
                searchUsersInProgress: action.searchUsersInProgress
            }

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
        type: SET_CURRENT_USERS_PAGE,
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

export const toggleSetIsWroteProgressActionCreator = (setIsWroteInProgress) => {
    return {
        type: TOGGLE_SET_IS_WROTE_PROGRESS,
        setIsWroteInProgress

    }
}

export const toggleFollowingProgressActionCreator = (followingInProgress) => {
    return {
        type: TOGGLE_FOLLOWING_PROGRESS,
        followingInProgress: followingInProgress
    }
}
export const toggleSearchUsersProgressActionCreator = (searchUsersInProgress) => {
    return {
        type: TOGGLE_SEARCH_USERS_PROGRESS,
        searchUsersInProgress: searchUsersInProgress
    }
}


export default usersPageReducer;