import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postsItems =
        props.postsData.map(p => <Post avaImg={props.avaImg} text={p.text}/>)

    let text = React.createRef()

    return (
        <div className={s.myPosts}>
            <textarea onChange={() => props.onPostTextChange(text)} value={props.newPostText} ref={text}
                      className={s.inputPostText}
                      name="Новый пост" id="" cols="10" rows="5"/>
            <button onClick={() => props.onAddNewPost()} className={s.addPostButton}>Add new post</button>
            {postsItems}
        </div>
    )

}

export default MyPosts;