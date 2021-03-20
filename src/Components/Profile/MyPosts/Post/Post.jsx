import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.post}>
            <div className={s.postText}>
                {props.text}
            </div>
            <div className={s.postLikeValue}>
                <p className={s.value}>{props.likeValue} like</p>
            </div>
        </div>
    )
}

export default Post;