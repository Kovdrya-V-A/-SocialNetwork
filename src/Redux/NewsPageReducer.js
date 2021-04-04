let initialNewsPage = {
    newsData: [
        {newsHeading: "Заголовок 1", newsText: "Текст новости 1", newsDate: "12.12.21", id: 1},
        {newsHeading: "Заголовок 2", newsText: "Текст новости 2", newsDate: "12.13.21", id: 2},
        {newsHeading: "Заголовок 3", newsText: "Текст новости 3", newsDate: "12.14.21", id: 3},
        {newsHeading: "Заголовок 4", newsText: "Текст новости 4", newsDate: "12.15.21", id: 4}
    ]
};

const newsPageReducer = (newsPage = initialNewsPage, action) => {

    return newsPage;
}

export default newsPageReducer;