const ADD_POST = "ADD_POST";
const POST_TEXT_CHANGE = "POST_TEXT_CHANGE";
const SET_POSTS = "SET_POSTS";
const SET_PROFILE_INFO = "SET_PROFILE_INFO";
const DELETE_POST = "DELETE_POST";


let initialProfilePage = {
    postsData: [],
    profileData: [{}],
    newPostText: "",
};


const profilePageReducer = (profilePage = initialProfilePage, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                idPost: action.idPost,
                text: action.text,
                dateTime: action.dateTime
            };
                return {
                    ...profilePage,
                    postsData: [newPost, ...profilePage.postsData],
                    newPostText: ""
                };

        }

        case DELETE_POST: {
            alert (action.message)
            return {...profilePage,
            postsData: profilePage.postsData.map(p => {
                if (p.idPost == action.idPost) {
                    return {...p, isDeleted:true}
                }
                return  p
            })}
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

export const addPostActionCreator = (idPost, text, dateTime) => {
    return {
        type: ADD_POST,
        idPost: idPost,
        text: text,
        dateTime: dateTime
    }
}

export const deletePostActionCreator = (idPost, message) => {
    return {
        type: DELETE_POST,
        idPost: idPost,
        message: message
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