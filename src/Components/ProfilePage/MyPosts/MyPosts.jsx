import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm, reset} from "redux-form";

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


    const onSubmit = (formData, dispatch) => {
        props.onAddNewPost(formData.postText)
        dispatch(reset("addPost"))
    }


    return (
        <div className={s.myPosts}>
            <ReduxAddPostForm addPostInProgress = {props.addPostInProgress} onSubmit = {onSubmit}/>
            <h2>Ваши посты:</h2>
            {props.postsData.length > 0 ? postsItems : "У вас пока нет постов"}
        </div>
    )

}

const AddPostForm = (props) => {
    return <form className={s.addPostForm} onSubmit={props.handleSubmit}>
        <Field className={s.inputPostText} placeholder="Есть что нового ?"
               name="postText" component={"textarea"}/>
        <button disabled={props.addPostInProgress}
                className={s.addPostButton}>Опубликовать
        </button>
    </form>
}

const ReduxAddPostForm = reduxForm({
    form: "addPost"
})(AddPostForm)

export default React.memo(MyPosts);