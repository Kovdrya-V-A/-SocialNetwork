import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

let PostDate = [
    {text: "СC-ЛАВА УКРАИНЕ !!!", likeValue: "31"},
    {text: "Становится хуже... Начинает расти пушок. Рука непроизвольно тянется к салу в магазине...", likeValue: "27"},
    {text: "Это мой первый пост, я родился. Уже подумываю выползти из-под шконки !", likeValue: "15"},
]

const MyPosts = () => {
    return (
        <div className={s.myPosts}>
            <textarea className={s.inputPostText} name="Новый пост" id="" cols="10" rows="5"/>
            <button className={s.addPostButton}>Add new post</button>
            <Post text = {PostDate[0].text} likeValue = {PostDate[0].likeValue} />
            <Post text = {PostDate[1].text} likeValue = {PostDate[1].likeValue} />
            <Post text = {PostDate[2].text} likeValue = {PostDate[2].likeValue} />
        </div>
    )
}

export default  MyPosts;