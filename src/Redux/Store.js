// import ProfileReducer from "./ProfileReducer";
// import DialogsReducer from "./DialogReducer";
// import NewsPageReducer from "./NewsPageReducer";
//
// let store = {
//     _state: {
//
//         profilePage: {
//             postsData: [
//                 {
//                     id: 4,
//                     avaImg: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album",
//                     text: "Я один дрочу на шпроты ? " +
//                         "Анонимно пожалуйста",
//                     likeValue: 17
//                 },
//
//                 {
//                     id: 3,
//                     avaImg: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album",
//                     text: "СC-ЛАВА УКРАИНЕ !!!" +
//                         "Ще не вмерла України, ні слава, ні воля, \n" +
//                         "Ще нам, браття молодії, усміхнеться доля! \n" +
//                         "Згинуть наші воріженьки, як роса на сонці, \n" +
//                         "Запануєм і ми, браття, у своїй сторонці! \n" +
//                         "Душу й тіло ми положим за нашу свободу \n" +
//                         "І — покажем, що ми, браття, козацького роду! \n" +
//                         "Душу й тіло ми положим за нашу свободу \n" +
//                         "І — покажем, що ми, браття, козацького роду!",
//                     likeValue: 31
//                 },
//                 {
//                     id: 2,
//                     avaImg: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album",
//                     text: "Становится хуже... Начинает расти пушок. Рука непроизвольно тянется к салу в магазине...",
//                     likeValue: 27
//                 },
//                 {
//                     id: "1",
//                     avaImg: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album",
//                     text: "Это мой первый пост, я родился. Уже подумываю выползти из-под шконки !",
//                     likeValue: 15
//                 },
//
//             ],
//             newPostText: "Новый пост",
//
//             profileData: [{
//                 name: "Михуил",
//                 address: "Под шконкой",
//                 date: "06.12.2004",
//                 imgSrc: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album"
//             }
//             ],
//         },
//
//         dialogsPage: {
//             dialogsData: [
//                 {
//                     id: 1,
//                     name: "Ваня",
//                     dialogAva: "data:image/jpeg;base64,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"
//                 },
//                 {
//                     id: 2,
//                     name: "Таня",
//                     dialogAva: "https://games.mail.ru/hotbox/content_files/gallery/2020/12/11/2830937c5cf146ed8d6300f5f291fffe.jpg"
//                 },
//                 {
//                     id: 3,
//                     name: "Саша",
//                     dialogAva: "https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg"
//                 },
//                 {
//                     id: 4,
//                     name: "Олег",
//                     dialogAva: "http://sun9-39.userapi.com/s/v1/ig2/8aqATIMGN_0ucbrpPT2w9-Od9s4_R-28vuF1rs263b_AnT8lBidXi9Tp1qazfob7TONkocJPt4t4cK1Z6ZOpdx3e.jpg?size=200x0&quality=96&crop=35,35,1002,1009&ava=1"
//                 },
//                 {id: 5, name: "Дима", dialogAva: "https://vjoy.cc/wp-content/uploads/2020/11/1572690290_4.jpg"},
//                 {
//                     id: 6,
//                     name: "Чорт",
//                     dialogAva: "https://sun1-14.userapi.com/s/v1/ig2/kz3of9qKNWwt0Mw-YMukcp2Rfs_jl_t4FwpmHCbt3SOGQJyQvVx9TULjsw_TB0ZtP5VHn2fpm5r_1DAtpcmMP39u.jpg?size=200x0&quality=96&crop=0,0,432,577&ava=1"
//                 }
//             ],
//
//             newMessageText: "",
//
//             messagesData: [
//                 {
//                     id: 1,
//                     message: "Привет ! Как дела ?",
//                     senderName: "Таня",
//                     senderAva: "https://games.mail.ru/hotbox/content_files/gallery/2020/12/11/2830937c5cf146ed8d6300f5f291fffe.jpg"
//                 },
//                 {
//                     id: 2,
//                     message: "Да",
//                     senderName: "Михуил",
//                     senderAva: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album"
//                 },
//                 {
//                     id: 3,
//                     message: "Что да ?",
//                     senderName: "Таня",
//                     senderAva: "https://games.mail.ru/hotbox/content_files/gallery/2020/12/11/2830937c5cf146ed8d6300f5f291fffe.jpg"
//                 },
//                 {
//                     id: 4,
//                     message: "Аааааа, ну так это. Да !",
//                     senderName: "Михуил",
//                     senderAva: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album"
//                 },
//                 {
//                     id: 5,
//                     message: "М-да",
//                     senderName: "Таня",
//                     senderAva: "https://games.mail.ru/hotbox/content_files/gallery/2020/12/11/2830937c5cf146ed8d6300f5f291fffe.jpg"
//                 }
//             ]
//         },
//
//         newsPage: {
//             newsData: [
//                 {newsHeading: "Заголовок 1", newsText: "Текст новости 1", newsDate: "12.12.21", id: 1},
//                 {newsHeading: "Заголовок 2", newsText: "Текст новости 2", newsDate: "12.13.21", id: 2},
//                 {newsHeading: "Заголовок 3", newsText: "Текст новости 3", newsDate: "12.14.21", id: 3},
//                 {newsHeading: "Заголовок 4", newsText: "Текст новости 4", newsDate: "12.15.21", id: 4}
//             ]
//         }
//     },
//     getState() {
//         return (this._state)
//     },
//     subscribe(observer) {
//         this._rerender = observer;
//     },
//     _rerender() {
//         alert("state changed")
//     },
//     dispatch(action) {
//         this._state.profilePage = ProfileReducer(this._state.profilePage, action)
//         this._state.dialogsPage = DialogsReducer(this._state.dialogsPage, action)
//         this._state.newsPage = NewsPageReducer (this._state.newsPage, action)
//         this._rerender(this._state);
//     }
// }
//
// export default store;
// window.store = store;