import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.wrapper}>
            <div className={s.avaPost}>
                <img src={props.avaImg} alt="avapost"/>
            </div>
            <div className={s.postContent}>
                <div className={s.name}><p>{props.name}</p></div>
                <div className={s.postText}>
                    <p>{props.text}</p>
                </div>
                <div className={s.dateTime}><p>{props.dateTime}</p>
                </div>
            </div>
            {props.isMyProfile ? <div className={s.deletePost}>
                <button disabled={props.deletePostInProgress} onClick={() => props.onDeletePost(props.idPost)}><p>×</p>
                </button>
            </div> : null}
        </div>
    )
}

export default React.memo(Post);