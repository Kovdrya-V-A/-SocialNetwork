import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

class MyPosts extends React.Component {

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

    onAddNewPost() {
        this.props.addNewPost();
    }


    onPostTextChange(text) {
        this.props.postTextChange(text)
    }

    render() {
        let postsItems =
            this.props.profilePage.postsData.map(p => <Post avaImg={p.avaImg} text={p.text} likeValue={p.likeValue}/>)

        let text = React.createRef()

        return (
            <div className={s.myPosts}>
            <textarea onChange={() => this.onPostTextChange(text)} value={this.props.profilePage.newPostText} ref={text}
                      className={s.inputPostText}
                      name="Новый пост" id="" cols="10" rows="5"/>
                <button onClick={() => this.onAddNewPost()} className={s.addPostButton}>Add new post</button>
                {postsItems}
            </div>
        )
    }
}

export default MyPosts;