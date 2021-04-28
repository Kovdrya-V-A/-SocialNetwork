import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postsItems =
        props.postsData.map(p => <Post avaImg={props.avaImg} text={p.text} key={p.idPost}/>)

    let text = React.createRef()

    return (
        <div className={s.myPosts}>
            <textarea onChange={() => props.onPostTextChange(text)} value={props.newPostText} ref={text}
                      className={s.inputPostText}
                      name="addPost" id="" cols="10" rows="5" />
            <button onClick={() => props.onAddNewPost(localStorage.getItem("userToken"), props.postText)}
                    className={s.addPostButton}>Add new post
            </button>
            <h2>Ваши посты:</h2>
            {postsItems}
        </div>
    )

}

export default MyPosts;