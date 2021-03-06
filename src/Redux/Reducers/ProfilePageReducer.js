import {
    addNewPostRequest,
    deletePostRequest,
    getMyPostsRequest,
    getMyProfileInfoRequest, getStatusRequest,
    updateUserStatusRequest
} from "../../DAL/ApiRequests";

const ADD_POST = "ADD_POST";
const SET_POSTS = "SET_POSTS";
const SET_PROFILE_INFO = "SET_PROFILE_INFO";
const DELETE_POST = "DELETE_POST";
const SET_CHANGE_AVA_IS_ACTIVE = "SET_CHANGE_AVA_IS_ACTIVE";
const SET_CHANGE_AVA_STATUS = "SET_CHANGE_AVA_STATUS";
const TOGGLE_ADD_POST_PROGRESS = "TOGGLE_ADD_POST_PROGRESS";
const TOGGLE_DELETE_POST_PROGRESS = "TOGGLE_DELETE_POST_PROGRESS";
const SET_STATUS = "SET_STATUS";
const SET_PROFILE_ID = "SET_PROFILE_ID";

let initialProfilePage = {
    postsData: [],
    profileData: [{}],
    changeAvaIsActive: false,
    changeAvaStatus: null,
    addPostInProgress: false,
    deletePostInProgress: false,
    status: "",
    profileId: null,
};


const profilePageReducer = (profilePage = initialProfilePage, action) => {

    switch (action.type) {

        case SET_PROFILE_ID: {
            return {
                ...profilePage,
                profileId: action.profileId
            }
        }

        case ADD_POST: {
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

        case SET_CHANGE_AVA_IS_ACTIVE : {
            return {
                ...profilePage,
                changeAvaIsActive: action.changeAvaIsActive
            }
        }

        case SET_CHANGE_AVA_STATUS: {
            return {
                ...profilePage,
                changeAvaStatus: action.status
            }
        }

        case DELETE_POST: {
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


        case SET_PROFILE_INFO:
            return {
                ...profilePage,
                profileData: [action.profileData]
            }


        case SET_POSTS:
            if (action.postsData) {
                return {
                    ...profilePage,
                    postsData: [...action.postsData]
                }
            }
        case TOGGLE_ADD_POST_PROGRESS:
            return {
                ...profilePage,
                addPostInProgress: action.addPostInProgress
            }

        case TOGGLE_DELETE_POST_PROGRESS:
            return {
                ...profilePage,
                deletePostInProgress: action.deletePostInProgress
            }

        case SET_STATUS:
            return {
                ...profilePage,
                status: action.statusText
            }

        default:
            return profilePage;
    }
    ;

}

export const setProfileId = (profileId) => {
    return {
        type: SET_PROFILE_ID,
        profileId
    }
}

export const setStatus = (statusText) => {
    return {
        type: SET_STATUS,
        statusText
    }
}

export const addPost = (idPost, text, dateTime) => {
    return {
        type: ADD_POST,
        idPost: idPost,
        text: text,
        dateTime: dateTime
    }
}

export const deletePost = (idPost, message) => {
    return {
        type: DELETE_POST,
        idPost: idPost,
        message: message
    }
}

export const setPosts = (postsData) => {
    return {
        type: SET_POSTS,
        postsData
    }
}

export const setProfileInfo = (profileData) => {
    return {
        type: SET_PROFILE_INFO,
        profileData
    }
}
export const setChangeAvaIsActive = (changeAvaIsActive) => {
    return {
        type: SET_CHANGE_AVA_IS_ACTIVE,
        changeAvaIsActive
    }
}
export const setChangeAvaStatus = (status) => {
    return {
        type: SET_CHANGE_AVA_STATUS,
        status
    }
}
export const toggleAddPostProgress = (addPostInProgress) => {
    return {
        type: TOGGLE_ADD_POST_PROGRESS,
        addPostInProgress
    }
}
export const toggleDeletePostProgress = (deletePostInProgress) => {
    return {
        type: TOGGLE_DELETE_POST_PROGRESS,
        deletePostInProgress
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


export default profilePageReducer;