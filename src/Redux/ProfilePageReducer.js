const ADD_POST = "ADD_POST";
const POST_TEXT_CHANGE = "POST_TEXT_CHANGE";

let initialProfilePage = {
    postsData: [
        {
            id: 4,
            avaImg: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album",
            text: "Я один дрочу на шпроты ? " +
                "Анонимно пожалуйста",
            likeValue: 17
        },

        {
            id: 3,
            avaImg: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album",
            text: "СC-ЛАВА УКРАИНЕ !!!" +
                "Ще не вмерла України, ні слава, ні воля, \n" +
                "Ще нам, браття молодії, усміхнеться доля! \n" +
                "Згинуть наші воріженьки, як роса на сонці, \n" +
                "Запануєм і ми, браття, у своїй сторонці! \n" +
                "Душу й тіло ми положим за нашу свободу \n" +
                "І — покажем, що ми, браття, козацького роду! \n" +
                "Душу й тіло ми положим за нашу свободу \n" +
                "І — покажем, що ми, браття, козацького роду!",
            likeValue: 31
        },
        {
            id: 2,
            avaImg: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album",
            text: "Становится хуже... Начинает расти пушок. Рука непроизвольно тянется к салу в магазине...",
            likeValue: 27
        },
        {
            id: "1",
            avaImg: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album",
            text: "Это мой первый пост, я родился. Уже подумываю выползти из-под шконки !",
            likeValue: 15
        },

    ],

    newPostText: "Новый пост",

    profileData: [{
        name: "Михуил",
        address: "Под шконкой",
        date: "06.12.2004",
        imgSrc: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album"
    }],
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

export default profilePageReducer;