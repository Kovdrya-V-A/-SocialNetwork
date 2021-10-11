import {
    followRequest,
    getFriendsRequest,
    goToDialogRequest,
    unFollowRequest
} from "../../DAL/ApiRequests";

import {setCurrentDialog} from "./DialogsPageReducer";

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
    friendsData: [] as Array<FriendType>,
    currentPage: 1 as number,
    pageSize: 7,
    totalFriendsCount: 0 as number,
    isFetching: false,
    followingInProgress: [] as Array<Number>,
    isWrote: false,
    isWroteInProgress: [] as Array<Number>,
};

export type FriendType = {
    id: number
    name: string
    img: string
}

export type initialStateType = typeof initialFriendsPage

const friendsPageReducer = (friendsPage = initialFriendsPage, action: any): initialStateType => {

    switch (action.type) {
        case UNFOLLOW:
            return {
                ...friendsPage,
                friendsData: friendsPage.friendsData.map((f: FriendType) => {
                    if (f.id === action.userId) {
                        return {...f, followed: false}
                    }
                    return f;
                })
            }

        case FOLLOW:
            return {
                ...friendsPage,
                friendsData: friendsPage.friendsData.map((f: FriendType) => {
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
            else return friendsPage

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
            return {
                ...friendsPage,
                isWroteInProgress: action.inProgress ? [...friendsPage.isWroteInProgress, action.userId] :
                    friendsPage.isWroteInProgress.filter(id => id != action.userId)
            }


        default: {
            return friendsPage
        }
    }
}


export const setFriends = (friendsData: Array<FriendType>) => {
    return {
        type: SET_FRIENDS,
        friendsData
    }
}

export const setCurrentPage = (number: number) => {
    return {
        type: SET_CURRENT_FRIENDS_PAGE,
        number
    }
}
export const setFriendsTotalCount = (count: number) => {
    return {
        type: SET_FRIENDS_TOTAL_COUNT,
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
export const follow = (friendId: number, message: string) => {
    return {
        type: FOLLOW,
        friendId,
        message
    }
}

export const unFollow = (userId: number, message: string) => {
    return {
        type: UNFOLLOW,
        userId,
        message
    }
}

export const toggleFollowingProgress = (inProgress: boolean, userId: number) => {
    return {
        type: FP_TOGGLE_FOLLOWING_PROGRESS,
        inProgress,
        userId
    }
}

export const toggleIsWroteProgress = (inProgress: boolean, userId: number) => {
    return {
        type: FP_TOGGLE_IS_WROTE_PROGRESS,
        inProgress,
        userId
    }
}


export const setFriendsThunkCreator = (currentPage: number, pageSize: number) => {
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const data = await getFriendsRequest(currentPage, pageSize)
        dispatch(setIsFetching(false))
        if (data) {
            dispatch(setFriends(data.items))
            dispatch(setFriendsTotalCount(data.totalCount))
        }
    }

}

export const unFollowThunkActionCreator = (userId: number) => {
    return async (dispatch: Function) => {
        dispatch(toggleFollowingProgress(true, userId))
        const data = await unFollowRequest(userId)
        dispatch(unFollow(userId, data.message))
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const followThunkActionCreator = (userId: number) => {
    return async (dispatch:Function) => {
        dispatch(toggleFollowingProgress(true, userId))
        const data = await followRequest(userId)
        dispatch(follow(userId, data.message))
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const setCurrentPageThunkActionCreator = (number: number, pageSize: number) => {
    return async (dispatch:Function) => {
        dispatch(setCurrentPage(number))
        dispatch(setIsFetching(true))
        const data = await getFriendsRequest(number, pageSize)
        dispatch(setIsFetching(false))
        dispatch(setFriends(data.items))
        dispatch(setFriendsTotalCount(data.totalCount))
    }
}

export const goToDialogThunkActionCreator = (userId: number) => {
    return async (dispatch:Function) => {
        dispatch(toggleIsWroteProgress(true, userId))
        const data = await goToDialogRequest(userId)
        dispatch(setIsWrote(true))
        dispatch(setCurrentDialog(data.idDialog))
        dispatch(toggleIsWroteProgress(false, userId))
    }
}

export default friendsPageReducer;