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
    usersData: [] as Array<UserType>,
    currentPage: 1 as number,
    pageSize: 7 as number,
    totalUsersCount: 0 as number,
    isFetching: false as boolean,
    isWrote: false as boolean,
    followingInProgress: [] as Array<number>,
    setIsWroteInProgress: [] as Array<number>,
    searchUsersInProgress: false as boolean,
};

export type initialStateType = typeof initialUsersPage

export type UserType = {
    id: number
    name: string
    img: string
    followed: number | boolean
}

const usersPageReducer = (usersPage = initialUsersPage, action: any): initialStateType => {

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

export const unFollow = (userId: number, message: string) => {
    return {
        type: UNFOLLOW,
        userId,
        message
    }
}


export const follow = (userId: number, message: string, error: any) => {
    return {
        type: FOLLOW,
        userId,
        message,
        error,
    }
}

export const setUsers = (usersData: Array<UserType>) => {
    return {
        type: SET_USERS,
        usersData
    }
}

export const setCurrentPage = (number: number) => {
    return {
        type: SET_CURRENT_USERS_PAGE,
        number
    }
}
export const setUserTotalCount = (count: number) => {
    return {
        type: SET_USERS_TOTAL_COUNT,
        count
    }
}

export const setIsFetching = (isFetch: boolean) => {
    return {
        type: SET_IS_FETCHING,
        isFetch
    }
}
export const setIsWrote = (isWrote: boolean) => {
    return {
        type: SET_IS_WROTE,
        isWrote
    }
}

export const toggleSetIsWroteProgress = (inProgress: boolean, userId: number) => {
    return {
        type: UP_TOGGLE_IS_WROTE_PROGRESS,
        inProgress,
        userId
    }
}

export const toggleFollowingProgress = (inProgress: boolean, userId: number) => {
    return {
        type: UP_TOGGLE_FOLLOWING_PROGRESS,
        inProgress,
        userId
    }
}
export const toggleSearchUsersProgress = (searchUsersInProgress: boolean) => {
    return {
        type: TOGGLE_SEARCH_USERS_PROGRESS,
        searchUsersInProgress: searchUsersInProgress
    }
}

export const setUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const data = await getUsersRequest(currentPage, pageSize)
        dispatch(setIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUserTotalCount(data.totalCount))
    }
}

export const searchUsersThunkCreator = (currentPage: number, pageSize: number, searchText: string) => {
    return async (dispatch: Function) => {
        toggleSearchUsersProgress(true)
        const data = await searchUsersRequest(currentPage, pageSize, true, searchText)
        dispatch(setUsers(data.items))
        dispatch(setUserTotalCount(data.totalCount))
        dispatch(toggleSearchUsersProgress(false))
    }
}

export const unFollowThunkCreator = (userId: number) => {
    return async (dispatch: Function) => {
        dispatch(toggleFollowingProgress(true, userId))
        const data = await unFollowRequest(userId)
        dispatch(unFollow(userId, data.message))
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const followThunkCreator = (userId: number) => {
    return async (dispatch: Function) => {
        dispatch(toggleFollowingProgress(true, userId))
        const data = await followRequest(userId)
        dispatch(follow(userId, data.message, data.error))
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const setCurrentPageThunkCreator = (number: number, pageSize: number) => {
    return async (dispatch: Function) => {
        dispatch(setCurrentPage(number))
        dispatch(setIsFetching(true))
        const data = await getUsersRequest(number, pageSize)
        dispatch(setIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUserTotalCount(data.totalCount))
    }
}

export const goToDialogThunkCreator = (userId: number) => {
    return async (dispatch: Function) => {
        dispatch(toggleSetIsWroteProgress(true, userId))
        const data = await goToDialogRequest(userId)
        dispatch(setIsWrote(true))
        dispatch(setCurrentDialog(data.idDialog))
        dispatch(toggleSetIsWroteProgress(false, userId))
    }
}


export default usersPageReducer;