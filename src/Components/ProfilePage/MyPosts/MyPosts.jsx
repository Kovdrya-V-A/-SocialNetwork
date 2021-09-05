import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postsItems =
        props.postsData.map(p => p.isDeleted ? null : <Post key={p.idPost}
                                                            avaImg={props.avaImg}
                                                            name={props.name}
                                                            text={p.text}
                                                            dateTime={p.dateTime}
                                                            idPost={p.idPost}
                                                            onDeletePost={props.onDeletePost}
                                                            deletePostInProgress={props.deletePostInProgress}/>)
    let text = React.createRef()


    return (
        <div className={s.myPosts}>
            <textarea onChange={() => props.onPostTextChange(text)} value={props.newPostText} ref={text}
                      className={s.inputPostText} placeholder="Есть что нового ?"
                      name="addPost" id="" cols="10" rows="5"/>
            <button disabled={props.addPostInProgress} onClick={() => props.onAddNewPost(props.postText)}
                    className={s.addPostButton}>Опубликовать
            </button>
            <h2>Ваши посты:</h2>
            {props.postsData.length > 0 ? postsItems : "У вас пока нет постов"}
        </div>
    )

}

export default React.memo(MyPosts);