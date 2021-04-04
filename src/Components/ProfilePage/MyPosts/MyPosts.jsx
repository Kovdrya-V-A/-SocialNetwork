import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postsItems =
        props.profilePage.postsData.map(p => <Post avaImg={p.avaImg} text={p.text} likeValue={p.likeValue}/>)

    let onAddNewPost = () => {
        props.addNewPost ();
    }
    let text = React.createRef()

    let onPostTextChange = () => {
        props.postTextChange (text)
    }

    return (
        <div className={s.myPosts}>
            <textarea onChange={onPostTextChange} value={props.profilePage.newPostText} ref={text} className={s.inputPostText}
                      name="Новый пост" id="" cols="10" rows="5"/>
            <button onClick={onAddNewPost} className={s.addPostButton}>Add new post</button>
            {postsItems}
        </div>
    )
}

export default MyPosts;