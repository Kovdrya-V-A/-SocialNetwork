import React from 'react';
import {
    addPostActionCreator,
    postTextChangeActionCreator,
    setPostsActionCreator
} from "../../../Redux/ProfilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";



let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addNewPost: () => {
            dispatch(addPostActionCreator())
        },
        postTextChange: (text) => {
            dispatch(postTextChangeActionCreator(text))
        },
        setPosts: (postsData) => {
            dispatch(setPostsActionCreator(postsData))
        }
    }
}


class MyPostsService extends React.Component {

    componentDidMount() {
        if (this.props.profilePage.postsData.length === 0) {
            this.props.setPosts(
                [{
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
                        id: 1,
                        avaImg: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album",
                        text: "Это мой первый пост, я родился. Уже подумываю выползти из-под шконки !",
                        likeValue: 15
                    }]
            )
        }
    }

    onAddNewPost = () => {
        this.props.addNewPost();
    }


    onPostTextChange = (text) => {
        this.props.postTextChange(text)
    }

    render() {
        return (
            <MyPosts postsData = {this.props.profilePage.postsData}
                     newPostText = {this.props.profilePage.newPostText}
                     onPostTextChange = {this.onPostTextChange}
                     onAddNewPost = {this.onAddNewPost}
            />
        )
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostsService)

export default MyPostsContainer