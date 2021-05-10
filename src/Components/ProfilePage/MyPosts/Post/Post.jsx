import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.postBox}>
            <div className={s.avaPost}>
                <img src={props.avaImg} alt="avapost"/>
            </div>
            <div className={s.postContent}>
                <div className={s.name}><p>{props.name}</p></div>
                <div className={s.postText}>
                    {props.text}
                </div>
                <div className={s.dateTime}><p>{props.dateTime}</p>
                </div>
            </div>
            <div className={s.deletePost}><p onClick={() => props.onDeletePost(props.idPost)}>X</p></div>
        </div>
    )
}

export default Post;