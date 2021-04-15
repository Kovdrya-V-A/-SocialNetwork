const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_FRIENDS = "SET_FRIENDS";

let initialFriendsPage = {
    friendsData: []
};

const FriendsPageReducer = (friendsPage = initialFriendsPage, action) => {

    switch (action.type) {
        case UNFOLLOW:
            return {
                ...friendsPage,
                friendsData: friendsPage.friendsData.map(f => {
                    if (f.id === action.userId) {
                        return {...f, followed: false}
                    }
                    return f;
                })
            }

        case FOLLOW:
            return {
                ...friendsPage,
                friendsData: friendsPage.friendsData.map(f => {
                    if (f.id === action.userId) {
                        return {...f, followed: true}
                    }
                    return f;
                })
            }

        case SET_FRIENDS:
            return {
                ...friendsPage, friendsData: [...friendsPage.friendsData, ...action.friendsData]
            }

        default: {
            return friendsPage
        }
    }
}

export const unFollowActionCreator = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
}

export const followActionCreator = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
}

export const setFriendsActionCreator = (friendsData) => {
    return {
        type: SET_FRIENDS,
        friendsData
    }
}


export default FriendsPageReducer;