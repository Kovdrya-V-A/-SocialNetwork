import {
    followRequest,
    getSelectedUserProfileRequest, getSelectedUserStatusRequest, getStatusRequest,
    goToDialogRequest,
    unFollowRequest,
} from "../../DAL/ApiRequests";
import {setCurrentDialog} from "./DialogsPageReducer";

const SET_USER_POSTS = "SET_USER_POSTS";
const SET_USER_PROFILE_INFO = "SET_USER_PROFILE_INFO";
const SET_SELECTED_USER_ID = " SET_SELECTED_USER_ID";
const SET_IS_WROTE = "SET_IS_WROTE";
const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SP_TOGGLE_IS_WROTE_PROGRESS = "SP_TOGGLE_IS_WROTE_PROGRESS";
const SP_TOGGLE_FOLLOWING_PROGRESS = "SP_TOGGLE_FOLLOWING_PROGRESS";
const SET_USER_STATUS = "SET_USER_STATUS";


let initialSelectedUserProfilePage = {
    userId: "",
    postsData: [],
    profileData: [{}],
    isWrote: false,
    setIsWroteInProgress: false,
    followingInProgress: false,
    userStatus:""

};


const selectedProfilePageReducer = (selectedProfilePage = initialSelectedUserProfilePage, action) => {

    switch (action.type) {

        case UNFOLLOW:
            return {
                ...selectedProfilePage,
                profileData: selectedProfilePage.profileData.map(f => {
                    return {...f, followed: false}
                })
            }

        case SET_USER_STATUS:
            return {
                ...selectedProfilePage,
                userStatus: action.statusText
            }

        case FOLLOW:
            return {
                ...selectedProfilePage,
                profileData: selectedProfilePage.profileData.map(f => {
                    return {...f, followed: true}
                })
            }

        case SET_IS_WROTE:
            return {...selectedProfilePage, isWrote: action.isWrote}

        case SET_SELECTED_USER_ID:
            return {
                ...selectedProfilePage,
                userId: action.userId
            }

        case SET_USER_PROFILE_INFO:
            return {
                ...selectedProfilePage,
                profileData: [action.profileData]
            }


        case SET_USER_POSTS:
            if (action.postsData) {
                return {
                    ...selectedProfilePage,
                    postsData: [...action.postsData]
                }
            }

        case SP_TOGGLE_IS_WROTE_PROGRESS:
            return {
                ...selectedProfilePage,
                setIsWroteInProgress: action.setIsWroteInProgress
            }

        case SP_TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...selectedProfilePage,
                followingInProgress: action.followingInProgress
            }

        default:
            return selectedProfilePage;
    }
    ;

}

export const setUserStatus = (statusText) => {
    return {
        type: SET_USER_STATUS,
        statusText
    }
}

export const setUserPosts = (postsData) => {
    return {
        type: SET_USER_POSTS,
        postsData
    }
}

export const setUserProfileInfo = (profileData) => {
    return {
        type: SET_USER_PROFILE_INFO,
        profileData
    }
}


export const setIsWrote = (isWrote) => {
    return {
        type: SET_IS_WROTE,
        isWrote
    }
}
export const follow = (userId, message) => {
    return {
        type: FOLLOW,
        userId,
        message
    }
}

export const unFollow = (userId, message) => {
    return {
        type: UNFOLLOW,
        userId,
        message
    }
}

export const toggleSetIsWroteProgress = (setIsWroteInProgress) => {
    return {
        type: SP_TOGGLE_IS_WROTE_PROGRESS,
        setIsWroteInProgress

    }
}

export const toggleFollowingProgress = (followingInProgress) => {
    return {
        type: SP_TOGGLE_FOLLOWING_PROGRESS,
        followingInProgress: followingInProgress
    }
}

export const setSelectedUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
        getSelectedUserProfileRequest(userId)
            .then(data => {
                getSelectedUserStatusRequest(userId)
                    .then(data => {
                        dispatch(setUserStatus(data.userStatus))
                    })
                dispatch(setUserProfileInfo(data.userInfo))
                if (data.posts[0]) {
                    dispatch(setUserPosts(data.posts))
                }
            })
    }
}

export const unFollowThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true))
        unFollowRequest(userId)
            .then(data => {
                dispatch(unFollow(userId, data.message))
                dispatch(toggleFollowingProgress(false))
            })
    }
}

export const followThunkCreator = (userId) => {
    return (dispatch) => {

        followRequest(userId)
            .then(data => {
                dispatch(follow(userId, data.message))
                dispatch(toggleFollowingProgress(false))
            })
    }
}

export const goToDialogThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(toggleSetIsWroteProgress(true))
        goToDialogRequest(userId)
            .then((data) => {
                dispatch(setIsWrote(true))
                dispatch(setCurrentDialog(data.idDialog))
                dispatch(toggleSetIsWroteProgress(false))
            })

    }

}

export default selectedProfilePageReducer;