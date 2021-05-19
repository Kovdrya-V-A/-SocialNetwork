const SET_USER_POSTS = "SET_USER_POSTS";
const SET_USER_PROFILE_INFO = "SET_USER_PROFILE_INFO";
const SET_SELECTED_USER_ID =" SET_SELECTED_USER_ID";
const SET_IS_WROTE = "SET_IS_WROTE";
const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";

let initialSelectedUserProfilePage = {
    userId: "",
    postsData: [],
    profileData: [{}],
    isWrote: false
};


const selectedProfilePageReducer = (selectedProfilePage = initialSelectedUserProfilePage, action) => {

    switch (action.type) {

        case UNFOLLOW:
            alert (action.message)
            return {
                ...selectedProfilePage,
                profileData: selectedProfilePage.profileData.map(f => {
                    return {...f, followed: false}
                })
            }

        case FOLLOW:
            alert (action.message)
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

        default:
            return selectedProfilePage;
    }
    ;

}

export const setUserPostsActionCreator = (postsData) => {
    return {
        type: SET_USER_POSTS,
        postsData
    }
}

export const setUserProfileInfoActionCreator = (profileData) => {
    return {
        type: SET_USER_PROFILE_INFO,
        profileData
    }
}


export const setIsWroteActionCreator = (isWrote) => {
    return {
        type: SET_IS_WROTE,
        isWrote
    }
}
export const followActionCreator = (userId, message) => {
    return {
        type: FOLLOW,
        userId,
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

export default selectedProfilePageReducer;