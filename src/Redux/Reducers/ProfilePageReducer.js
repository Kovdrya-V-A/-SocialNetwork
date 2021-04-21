const ADD_POST = "ADD_POST";
const POST_TEXT_CHANGE = "POST_TEXT_CHANGE";
const SET_POSTS = "SET_POSTS";
const SET_PROFILE_INFO = "SET_PROFILE_INFO"

let initialProfilePage = {
    postsData: [],
    profileData: [{}],
    newPostText: "Новый пост",
};


const profilePageReducer = (profilePage = initialProfilePage, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                avaImg: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album",
                text: profilePage.newPostText,
                likeValue: 0
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

            return {
                ...profilePage,
                profileData: [...action.profileData]
            }


        case SET_POSTS:
            return {
                ...profilePage,
                postsData: [...profilePage.postsData, ...action.postsData]
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