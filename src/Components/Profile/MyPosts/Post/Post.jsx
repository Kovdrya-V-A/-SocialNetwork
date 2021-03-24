import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.postBox}>
            <div className={s.avaPost}>
                <img src={props.avaImg} alt="avapost"/>
            </div>
            <div className={s.postContent}>
                <div className={s.postText}>
                    {props.text}
                </div>
                <div className={s.postLikeValue}>
                    <p className={s.value}>
                        {props.likeValue} like
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Post;