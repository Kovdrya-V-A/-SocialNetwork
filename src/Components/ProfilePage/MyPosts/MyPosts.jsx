import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm, reset} from "redux-form";
import {CreateFormItem} from "../../Common/FormsElements/FormsElements";
import {checkLenghtCreator} from "../../Common/Validators/Validators";

const MyPosts = (props) => {

    let postsItems =
        props.postsData.map(p => p.isDeleted ? null : <Post key={p.idPost}
                                                            avaImg={props.avaImg}
                                                            name={props.name}
                                                            text={p.text}
                                                            dateTime={p.dateTime}
                                                            idPost={p.idPost}
                                                            onDeletePost={props.onDeletePost}
                                                            deletePostInProgress={props.deletePostInProgress}
                                                            isMyProfile = {props.isMyProfile}/>)


    const onSubmit = (formData, dispatch) => {
        props.onAddNewPost(formData.postText)
        dispatch(reset("addPost"))
    }


    return (
        <div className={s.myPosts}>
            {props.isMyProfile ?<ReduxAddPostForm addPostInProgress={props.addPostInProgress} onSubmit={onSubmit}/>:null}
            <h2>{props.isMyProfile ? "Ваши посты:" : "Посты пользователя:"}</h2>
            {props.postsData.length > 0 ? postsItems : "В профиле пока нет постов"}
        </div>
    )

}

const TextAreaForm = CreateFormItem("textarea")
const requiredLength = checkLenghtCreator(0, 500)

const AddPostForm = (props) => {
    return <form className={s.addPostForm} onSubmit={props.handleSubmit}>
        <Field placeholder="Есть что нового ?"
               name="postText" validate={[requiredLength]} component={TextAreaForm}/>
        <button
            disabled={props.addPostInProgress}
            className={s.addPostButton}>Опубликовать
        </button>
    </form>
}

const ReduxAddPostForm = reduxForm({
    form: "addPost"
})(AddPostForm)

export default React.memo(MyPosts);