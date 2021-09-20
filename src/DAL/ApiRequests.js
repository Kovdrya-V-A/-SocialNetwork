import * as axios from "axios";


//AUTH

export let serverLink = "https://188.32.105.146:8123"

export const userVerificationRequest = (login, password) => {
    return axios.post(`${serverLink}/auth`, {"login": login, "password": password})
        .then(response => {
            return response.data
        })
}

export const checkAuthMeRequest = () => {
    return axios.get(`${serverLink}/checkAuthMe?token=${localStorage.getItem("userToken")}`)
        .then(response => {
            return response.data
        })
}

//REG

export const userRegistrationRequest = (login, firstName, lastName, password, address, age, email) => {
    return axios.post(`${serverLink}/reg`, {
        "login": login,
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "address": address,
        "age": age,
        "email": email,
    },)
        .then(response => {
            return response.data
        })
}

//DIALOGS_PAGE

export const getDialogsRequest = () => {
    return axios.get(`${serverLink}/dialogs?token=${localStorage.getItem("userToken")}`)
        .then(response => {
            return response.data
        })
}

export const getMessagesRequest = (idDialog) => {
    return axios.get(`${serverLink}/messages?token=${localStorage.getItem("userToken")}&idDialog=${idDialog}`)
        .then(response => {
            return response.data
        })
}

export const deleteDialogRequest = (idDialog) => {
    return axios.delete(`${serverLink}/deleteDialog`, {
        data: {
            "token": localStorage.getItem("userToken"),
            "idDialog": idDialog,
        }
    })
        .then(response => {
            return response.data
        })
}


export const deleteMessageRequest = (dialogId, idMessage) => {
    return axios.delete(`${serverLink}/deleteMessage`,
        {
            data: {
                "token": localStorage.getItem("userToken"),
                "idDialog": dialogId,
                "idMessage": idMessage,
            }
        })
        .then(response => {
            return response.data
        })
}


export const goToDialogRequest = (userId) => {
    return axios.post(`${serverLink}/createDialog`, {
        "token": localStorage.getItem("userToken"),
        "userId": userId
    })
        .then(response => {
            return response.data
        })
}


export const sendNewMessageRequest = (dialogId, messageText) => {
    return axios.post(`${serverLink}/sendMessage`,
        {
            "token": localStorage.getItem("userToken"),
            "idDialog": dialogId,
            "text": messageText,
        })
        .then(response => {
            return response.data
        })
}

//FRIENDS_PAGE

export const getFriendsRequest = (page, count) => {
    return axios.get(`${serverLink}/friends?token=${localStorage.getItem("userToken")}&page=${page}&count=${count}`)
        .then(response => {
            return response.data
        })
}

export const unFollowRequest = (userId) => {
    return axios.delete(`${serverLink}/unFollowFriend`,
        {
            data: {
                "token": localStorage.getItem("userToken"),
                "userId": userId,

            }
        })
        .then(response => {
            return response.data
        })
}

export const followRequest = (userId) => {
    return axios.post(`${serverLink}/followFriend`,

        {
            "token": localStorage.getItem("userToken"),
            "userId": userId,

        }
    )
        .then(response => {
            return response.data
        })
}


//USERS_PAGE

export const getUsersRequest = (page, count) => {
    return axios.get(`${serverLink}/users?token=${localStorage.getItem("userToken")}&page=${page}&count=${count}`)
        .then(response => {
            return response.data
        })
}

export const searchUsersRequest = (page, count, isSearch, searchText) => {
    if (searchText.length > 0) {
        return axios.get(`${serverLink}/users?token=${localStorage.getItem("userToken")}&page=${page}&count=${count}&isSearch=${isSearch}&searchText=${searchText}`)
            .then(response => {
                return response.data
            })
    }
    return getUsersRequest(page, count)
}

//NEWS_PAGE

export const getNewsRequest = (page, count) => {
    return axios.get(`${serverLink}/news?token=${localStorage.getItem("userToken")}&page=${page}&count=${count}`)
        .then(response => {
            return response.data
        })
}

//PROFILE_PAGE


export const getMyProfileInfoRequest = () => {
    return axios.get(`${serverLink}/authProfileInfo?token=${localStorage.getItem("userToken")}`)
        .then(response => {
            return response.data
        })
}

export const getMyPostsRequest = () => {
    return axios.get(`${serverLink}/posts?token=${localStorage.getItem("userToken")}`)
        .then(response => {
            return response.data
        })
}

export const addNewPostRequest = (postText) => {
    return axios.post(`${serverLink}/addPost`, {
        "token": localStorage.getItem("userToken"),
        "postText": postText
    })
        .then(response => {
            return response.data
        })
}

export const deletePostRequest = (idPost) => {
    return axios.delete(`${serverLink}/deletePost`, {
            data: {
                "token":
                    localStorage.getItem("userToken"),
                "idPost": idPost
            }
        }
    )
        .then(response => {
            return response.data
        })
}

export const updateUserStatusRequest = (newStatusText) => {
    return axios.put(`${serverLink}/updUserStatus`, {

        "token": localStorage.getItem("userToken"),
        "statusText": newStatusText
    })
        .then(response => {
            return response.data
        })
}

export const getStatusRequest = () => {
    return axios.get(`${serverLink}/status?token=${localStorage.getItem("userToken")}`)
        .then(response => {
            return response.data
        })
}

//SELECTED_PROFILE_PAGE

export const getSelectedUserProfileRequest = (id) => {
    return axios.get(`${serverLink}/user?token=${localStorage.getItem("userToken")}&id=${id}`)
        .then(response => {
            return response.data
        })
}

export const getSelectedUserStatusRequest = (userId) => {
    return axios.get(`${serverLink}/status?token=${localStorage.getItem("userToken")}&userId=${userId}`)
        .then(response => {
            return response.data
        })
}


