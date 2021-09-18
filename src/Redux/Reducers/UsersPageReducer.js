import {
    followRequest,
    getUsersRequest,
    goToDialogRequest,
    searchUsersRequest,
    unFollowRequest
} from "../../DAL/ApiRequests";
import {setCurrentDialog} from "./DialogsPageReducer";

const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET_USERS";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const SET_CURRENT_USERS_PAGE = "SET_CURRENT_USERS_PAGE";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_IS_WROTE = "SET_IS_WROTE";
const UP_TOGGLE_IS_WROTE_PROGRESS = "UP_TOGGLE_IS_WROTE_PROGRESS";
const UP_TOGGLE_FOLLOWING_PROGRESS = "UP_TOGGLE_FOLLOWING_PROGRESS";
const TOGGLE_SEARCH_USERS_PROGRESS = "TOGGLE_SEARCH_USERS_PROGRESS";

let initialUsersPage = {

    usersData: [],
    currentPage: 1,
    pageSize: 7,
    totalUsersCount: 0,
    isFetching: false,
    isWrote: false,
    followingInProgress: [],
    setIsWroteInProgress: [],
    searchUsersInProgress: false,
};

const usersPageReducer = (usersPage = initialUsersPage, action) => {

    switch (action.type) {

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

        case UP_TOGGLE_IS_WROTE_PROGRESS:
            return {
                ...usersPage,
                setIsWroteInProgress: action.inProgress ? [...usersPage.setIsWroteInProgress, action.userId] :
                    usersPage.setIsWroteInProgress.filter(id => id != action.userId)
            }

        case UP_TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...usersPage,
                followingInProgress: action.inProgress ? [...usersPage.followingInProgress, action.userId] :
                    usersPage.followingInProgress.filter(id => id !== action.userId)
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

export const unFollow = (userId, message) => {
    return {
        type: UNFOLLOW,
        userId,
        message
    }
}


export const follow = (userId, message, error) => {
    return {
        type: FOLLOW,
        userId,
        message,
        error,
    }
}

export const setUsers = (usersData) => {
    return {
        type: SET_USERS,
        usersData
    }
}

export const setCurrentPage = (number) => {
    return {
        type: SET_CURRENT_USERS_PAGE,
        number
    }
}
export const setUserTotalCount = (count) => {
    return {
        type: SET_USERS_TOTAL_COUNT,
        count
    }
}

export const setIsFetching = (isFetch) => {
    return {
        type: SET_IS_FETCHING,
        isFetch
    }
}
export const setIsWrote = (isWrote) => {
    return {
        type: SET_IS_WROTE,
        isWrote
    }
}

export const toggleSetIsWroteProgress = (inProgress, userId) => {
    return {
        type: UP_TOGGLE_IS_WROTE_PROGRESS,
        inProgress,
        userId
    }
}

export const toggleFollowingProgress = (inProgress, userId) => {
    return {
        type: UP_TOGGLE_FOLLOWING_PROGRESS,
        inProgress,
        userId
    }
}
export const toggleSearchUsersProgress = (searchUsersInProgress) => {
    return {
        type: TOGGLE_SEARCH_USERS_PROGRESS,
        searchUsersInProgress: searchUsersInProgress
    }
}

export const setUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const data = await getUsersRequest(currentPage, pageSize)
        dispatch(setIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUserTotalCount(data.totalCount))
    }
}

export const searchUsersThunkCreator = (currentPage, pageSize, searchText) => {
    return async (dispatch) => {
        toggleSearchUsersProgress(true)
        const data = await searchUsersRequest(currentPage, pageSize, true, searchText)
        dispatch(setUsers(data.items))
        dispatch(setUserTotalCount(data.totalCount))
        dispatch(toggleSearchUsersProgress(false))
    }
}

export const unFollowThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        const data = await unFollowRequest(userId)
        dispatch(unFollow(userId, data.message))
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const followThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        const data = await followRequest(userId)
        dispatch(follow(userId, data.message, data.error))
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const setCurrentPageThunkCreator = (number, pageSize) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(number))
        dispatch(setIsFetching(true))
        const data = await getUsersRequest(number, pageSize)
        dispatch(setIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUserTotalCount(data.totalCount))
    }
}

export const goToDialogThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleSetIsWroteProgress(true, userId))
        const data = await goToDialogRequest(userId)
        dispatch(setIsWrote(true))
        dispatch(setCurrentDialog(data.idDialog))
        dispatch(toggleSetIsWroteProgress(false, userId))
    }
}


export default usersPageReducer;