const ADD_POST = "ADD_POST";
const POST_TEXT_CHANGE = "POST_TEXT_CHANGE";
const SET_POSTS = "SET_POSTS";
const SET_PROFILE_INFO = "SET_PROFILE_INFO"

let initialProfilePage = {
    postsData: [],
    profileData: [{}],
    newPostText: "",
};


const profilePageReducer = (profilePage = initialProfilePage, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                text: profilePage.newPostText,
            };

            if (newPost.text != "") {
                return {
                    ...profilePage,
                    postsData: [...profilePage.postsData, newPost],
                    newPostText: ""
                };
            } else {
                alert("Пост должен содержать контент !")
                return profilePage;
            }

        }

        case POST_TEXT_CHANGE: {
            return {
                ...profilePage,
                newPostText: action.enteredPostText
            }
        }

        case SET_PROFILE_INFO:
            console.log(action.profileData)
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

        default:
            return profilePage;
    }
    ;

}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}
export const postTextChangeActionCreator = (text) => {
    return {
        type: POST_TEXT_CHANGE,
        enteredPostText: text.current.value
    }
}

export const setPostsActionCreator = (postsData) => {
    return {
        type: SET_POSTS,
        postsData
    }
}

export const setProfileInfoActionCreator = (profileData) => {
    return {
        type: SET_PROFILE_INFO,
        profileData
    }
}

export default profilePageReducer;