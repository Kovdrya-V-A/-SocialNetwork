const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

let initialUsersPage = {
    usersData: [],
    currentPage: 1,
    pageSize: 7,
    totalUsersCount: 50
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


export default usersPageReducer;