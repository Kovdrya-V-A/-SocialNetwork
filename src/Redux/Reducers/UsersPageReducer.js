const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET_USERS";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_IS_WROTE = "SET_IS_WROTE";

let initialUsersPage = {
    usersData: [],
    currentPage: 1,
    pageSize: 7,
    totalUsersCount: 0,
    isFetching: false,
    isWrote: false,
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
                        return {...f, followed: true}
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

export const unFollowActionCreator = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
}

export const followActionCreator = (userId) => {
    return {
        type: FOLLOW,
        userId
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


export default usersPageReducer;