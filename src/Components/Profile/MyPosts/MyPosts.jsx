import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postsItems =
        props.postsData.map(p => <Post avaImg={p.avaImg} text={p.text} likeValue={p.likeValue}/>)

    let addNewPost = () => {
        props.addPost()
    }
    let newPost = React.createRef()

    let onPostTextChange = () => {
        let enteredPostText = newPost.current.value;
        props.postTextChange(enteredPostText)

    }

    return (
        <div className={s.myPosts}>
            <textarea onChange={onPostTextChange} value={props.newPostText} ref={newPost} className={s.inputPostText}
                      name="Новый пост" id="" cols="10" rows="5"/>
            <button onClick={addNewPost} className={s.addPostButton}>Add new post</button>
            {postsItems}
        </div>
    )
}

export default MyPosts;