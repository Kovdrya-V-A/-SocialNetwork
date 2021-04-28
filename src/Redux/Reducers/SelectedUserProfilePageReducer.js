const SET_USER_POSTS = "SET_USER_POSTS";
const SET_USER_PROFILE_INFO = "SET_USER_PROFILE_INFO";
const SET_SELECTED_USER_ID =" SET_SELECTED_USER_ID";

let initialSelectedUserProfilePage = {
    userId: "",
    postsData: [],
    profileData: [{}],
};


const selectedProfilePageReducer = (selectedProfilePage = initialSelectedUserProfilePage, action) => {

    switch (action.type) {

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

export const setSelectedUserIdActionCreator = (userId) => {
    return {
        type: SET_SELECTED_USER_ID,
        userId
    }
}

export default selectedProfilePageReducer;