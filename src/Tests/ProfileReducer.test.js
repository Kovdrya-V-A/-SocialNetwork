import profilePageReducer, {addPost} from "../Redux/Reducers/ProfilePageReducer";



test('new post add test', () => {

    let initialProfilePage = {
        postsData: [],
        profileData: [{}],
        changeAvaIsActive: false,
        changeAvaStatus: null,
        addPostInProgress: false,
        deletePostInProgress: false,
        status: ""
    };

    let newState = profilePageReducer(initialProfilePage, addPost(107, "seeee", "утута"))
    expect (newState.postsData.length).toBe(1)
});


