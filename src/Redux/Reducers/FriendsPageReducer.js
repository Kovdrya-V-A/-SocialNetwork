const SET_FRIENDS = "SET_FRIENDS";
const SET_FRIENDS_TOTAL_COUNT = "SET_FRIENDS_TOTAL_COUNT";
const SET_CURRENT_FRIENDS_PAGE = "SET_CURRENT_FRIENDS_PAGE";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_IS_WROTE = "SET_IS_WROTE";
const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const FP_TOGGLE_FOLLOWING_PROGRESS = "FP_TOGGLE_FOLLOWING_PROGRESS";
const FP_TOGGLE_IS_WROTE_PROGRESS = "FP_TOGGLE_IS_WROTE_PROGRESS";

let initialFriendsPage = {
    friendsData: [],
    currentPage: 1,
    pageSize: 7,
    totalFriendsCount: 0,
    isFetching: false,
    followingInProgress: [],
    isWrote: false,
    isWroteInProgress: false,
};

const friendsPageReducer = (friendsPage = initialFriendsPage, action) => {

    switch (action.type) {
        case UNFOLLOW:
            return {
                ...friendsPage,
                friendsData: friendsPage.friendsData.map(f => {
                    if (f.id === action.userId) {
                        return {...f, followed: false}
                    }
                    return f;
                })
            }

        case FOLLOW:
            return {
                ...friendsPage,
                friendsData: friendsPage.friendsData.map(f => {
                    if (f.id === action.friendId) {
                        return {...f, followed: true}
                    }
                    return f;
                })
            }

        case SET_IS_WROTE:
            return {...friendsPage, isWrote: action.isWrote}


        case SET_FRIENDS:
            if (action.friendsData) {
                return {
                    ...friendsPage, friendsData: [...action.friendsData]
                }
            }

        case SET_CURRENT_FRIENDS_PAGE:
            return {
                ...friendsPage, currentPage: action.number
            }

        case SET_FRIENDS_TOTAL_COUNT:
            return {
                ...friendsPage, totalFriendsCount: action.count
            }
        case FP_TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...friendsPage,
                followingInProgress: action.inProgress ? [...friendsPage.followingInProgress, action.userId] :
                    friendsPage.followingInProgress.filter(id => id != action.userId)
            }

        case FP_TOGGLE_IS_WROTE_PROGRESS:
            return {...friendsPage, isWroteInProgress: action.isWroteInProgress}


        default: {
            return friendsPage
        }
    }
}


export const setFriendsActionCreator = (friendsData) => {
    return {
        type: SET_FRIENDS,
        friendsData
    }
}

export const setCurrentPageActionCreator = (number) => {
    return {
        type: SET_CURRENT_FRIENDS_PAGE,
        number
    }
}
export const setFriendsTotalCountActionCreator = (count) => {
    return {
        type: SET_FRIENDS_TOTAL_COUNT,
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
export const followActionCreator = (friendId, message) => {
    return {
        type: FOLLOW,
        friendId,
        message
    }
}

export const unFollowActionCreator = (userId, message) => {
    return {
        type: UNFOLLOW,
        userId,
        message
    }
}

export const toggleFollowingProgressActionCreator = (inProgress, userId) => {
    return {
        type: FP_TOGGLE_FOLLOWING_PROGRESS,
        inProgress,
        userId
    }
}

export const toggleIsWroteProgressActionCreator = (isWroteInProgress) => {
    return {
        type: FP_TOGGLE_IS_WROTE_PROGRESS,
        isWroteInProgress
    }
}



export default friendsPageReducer;