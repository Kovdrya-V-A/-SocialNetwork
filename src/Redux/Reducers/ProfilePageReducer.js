import {
    addNewPostRequest,
    deletePostRequest, followRequest,
    getMyPostsRequest,
    getMyProfileInfoRequest, getStatusRequest, goToDialogRequest, unFollowRequest,
    updateUserStatusRequest
} from "../../DAL/ApiRequests";
import {setCurrentDialog} from "./DialogsPageReducer";

const PPActionsTypes = {
    ADD_POST: "ADD_POST",
    SET_POSTS: "SET_POSTS",
    SET_PROFILE_INFO: "SET_PROFILE_INFO",
    DELETE_POST: "DELETE_POST",
    SET_CHANGE_AVA_IS_ACTIVE: "SET_CHANGE_AVA_IS_ACTIVE",
    SET_CHANGE_AVA_STATUS: "SET_CHANGE_AVA_STATUS",
    TOGGLE_ADD_POST_PROGRESS: "TOGGLE_ADD_POST_PROGRESS",
    TOGGLE_DELETE_POST_PROGRESS: "TOGGLE_DELETE_POST_PROGRESS",
    SET_STATUS: "SET_STATUS",
    TOGGLE_IS_WROTE_PROGRESS: "SP_TOGGLE_IS_WROTE_PROGRESS",
    TOGGLE_FOLLOWING_PROGRESS: "SP_TOGGLE_FOLLOWING_PROGRESS",
    SET_IS_WROTE: "SET_IS_WROTE",
    UNFOLLOW: "UNFOLLOW",
    FOLLOW: "FOLLOW",
}

let initialProfilePage = {
    postsData: [],
    profileData: [{}],
    changeAvaIsActive: false,
    changeAvaStatus: null,
    addPostInProgress: false,
    deletePostInProgress: false,
    status: "",
    isWrote: false,
    setIsWroteInProgress: false,
    followingInProgress: false,
};


const profilePageReducer = (profilePage = initialProfilePage, action) => {

    switch (action.type) {

        case PPActionsTypes.UNFOLLOW:
            return {
                ...profilePage,
                profileData: profilePage.profileData.map(f => {
                    return {...f, followed: false}
                })
            }


        case PPActionsTypes.FOLLOW:
            return {
                ...profilePage,
                profileData: profilePage.profileData.map(f => {
                    return {...f, followed: true}
                })
            }

        case PPActionsTypes.SET_IS_WROTE:
            return {...profilePage, isWrote: action.isWrote}


        case PPActionsTypes.ADD_POST: {
            let newPost = {
                idPost: action.idPost,
                text: action.text,
                dateTime: action.dateTime
            };
            return {
                ...profilePage,
                postsData: [newPost, ...profilePage.postsData],
            };

        }

        case PPActionsTypes.SET_CHANGE_AVA_IS_ACTIVE : {
            return {
                ...profilePage,
                changeAvaIsActive: action.changeAvaIsActive
            }
        }

        case PPActionsTypes.SET_CHANGE_AVA_STATUS: {
            return {
                ...profilePage,
                changeAvaStatus: action.status
            }
        }

        case PPActionsTypes.DELETE_POST: {
            return {
                ...profilePage,
                postsData: profilePage.postsData.map(p => {
                    if (p.idPost === action.idPost) {
                        return {...p, isDeleted: true}
                    }
                    return p
                })
            }
        }


        case PPActionsTypes.SET_PROFILE_INFO:
            return {
                ...profilePage,
                profileData: [action.profileData]
            }


        case PPActionsTypes.SET_POSTS:
            if (action.postsData) {
                return {
                    ...profilePage,
                    postsData: [...action.postsData]
                }
            }
        case PPActionsTypes.TOGGLE_ADD_POST_PROGRESS:
            return {
                ...profilePage,
                addPostInProgress: action.addPostInProgress
            }

        case PPActionsTypes.TOGGLE_DELETE_POST_PROGRESS:
            return {
                ...profilePage,
                deletePostInProgress: action.deletePostInProgress
            }

        case PPActionsTypes.SET_STATUS:
            return {
                ...profilePage,
                status: action.statusText
            }

        case PPActionsTypes.TOGGLE_IS_WROTE_PROGRESS:
            return {
                ...profilePage,
                setIsWroteInProgress: action.setIsWroteInProgress
            }

        case PPActionsTypes.TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...profilePage,
                followingInProgress: action.followingInProgress
            }

        default:
            return profilePage;
    }
    ;

}

export const setIsWrote = (isWrote) => {
    return {
        type: PPActionsTypes.SET_IS_WROTE,
        isWrote
    }
}
export const follow = (message) => {
    return {
        type: PPActionsTypes.FOLLOW,
        message
    }
}

export const unFollow = (message) => {
    return {
        type: PPActionsTypes.UNFOLLOW,
        message
    }
}

export const setStatus = (statusText) => {
    return {
        type: PPActionsTypes.SET_STATUS,
        statusText
    }
}

export const addPost = (idPost, text, dateTime) => {
    return {
        type: PPActionsTypes.ADD_POST,
        idPost: idPost,
        text: text,
        dateTime: dateTime
    }
}

export const deletePost = (idPost, message) => {
    return {
        type: PPActionsTypes.DELETE_POST,
        idPost: idPost,
        message: message
    }
}

export const setPosts = (postsData) => {
    return {
        type: PPActionsTypes.SET_POSTS,
        postsData
    }
}

export const setProfileInfo = (profileData) => {
    return {
        type: PPActionsTypes.SET_PROFILE_INFO,
        profileData
    }
}
export const setChangeAvaIsActive = (changeAvaIsActive) => {
    return {
        type: PPActionsTypes.SET_CHANGE_AVA_IS_ACTIVE,
        changeAvaIsActive
    }
}
export const setChangeAvaStatus = (status) => {
    return {
        type: PPActionsTypes.SET_CHANGE_AVA_STATUS,
        status
    }
}
export const toggleAddPostProgress = (addPostInProgress) => {
    return {
        type: PPActionsTypes.TOGGLE_ADD_POST_PROGRESS,
        addPostInProgress
    }
}
export const toggleDeletePostProgress = (deletePostInProgress) => {
    return {
        type: PPActionsTypes.TOGGLE_DELETE_POST_PROGRESS,
        deletePostInProgress
    }
}

export const toggleSetIsWroteProgress = (setIsWroteInProgress) => {
    return {
        type: PPActionsTypes.TOGGLE_IS_WROTE_PROGRESS,
        setIsWroteInProgress

    }
}

export const toggleFollowingProgress = (followingInProgress) => {
    return {
        type: PPActionsTypes.TOGGLE_FOLLOWING_PROGRESS,
        followingInProgress: followingInProgress
    }
}


export const setPostsThunkCreator = (profileId) => {
    return async (dispatch) => {
        const data = await getMyPostsRequest(profileId)
        if (data) {
            dispatch(setPosts(data.items))
        } else {
            dispatch(setPosts([]))
        }
    }
}

export const addPostThunkCreator = (postText) => {
    return async (dispatch) => {
        dispatch(toggleAddPostProgress(true))
        const data = await addNewPostRequest(postText)
        dispatch(addPost(data[0].idPost, data[0].text, data[0].dateTime))
        dispatch(toggleAddPostProgress(false))
    }
}

export const deletePostThunkCreator = (idPost) => {
    return async (dispatch) => {
        dispatch(toggleDeletePostProgress(true))
        const data = await deletePostRequest(idPost)
        dispatch(deletePost(idPost, data.message))
        dispatch(toggleDeletePostProgress(false))
    }
}

export const setProfileInfoThunkCreator = (profileId) => {
    return async (dispatch) => {
        const data = await getMyProfileInfoRequest(profileId)
        dispatch(setProfileInfo(data))
        const statusData = await getStatusRequest(profileId)
        dispatch(setStatus(statusData.userStatus))
    }
}

export const setNewStatusThunkCreator = (newStatusText) => {
    return async (dispatch) => {
        const data = await updateUserStatusRequest(newStatusText)
        if (!data.error) {
            dispatch(setStatus(data.userStatus))
        }
    }
}

export const unFollowThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true))
        const data = await unFollowRequest(userId)
        dispatch(unFollow(userId, data.message))
        dispatch(toggleFollowingProgress(false))
    }
}

export const followThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true))
        const data = await followRequest(userId)
        dispatch(follow(userId, data.message))
        dispatch(toggleFollowingProgress(false))
    }
}

export const goToDialogThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleSetIsWroteProgress(true))
        const data = await goToDialogRequest(userId)
        dispatch(setIsWrote(true))
        dispatch(setCurrentDialog(data.idDialog))
        dispatch(toggleSetIsWroteProgress(false))


    }

}


export default profilePageReducer;