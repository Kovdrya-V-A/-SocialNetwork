import profilePageReducer, {addPost, setStatus} from "../Redux/Reducers/ProfilePageReducer";

let initialProfilePage = {
    postsData: [],
    profileData: [{}],
    changeAvaIsActive: false,
    changeAvaStatus: null,
    addPostInProgress: false,
    deletePostInProgress: false,
    status: ""
};

test('new post add test', () => {
    let newState = profilePageReducer(initialProfilePage, addPost(107, "seeee", "утута"))
    expect (newState.postsData.length).toBe(1)
});


test ('currect change user status', () => {
    let newState = profilePageReducer(initialProfilePage, setStatus("newStatus"))
    expect (newState.status).toBe("newStatus")
})
