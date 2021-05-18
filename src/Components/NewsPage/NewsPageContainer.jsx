import React from 'react';
import NewsPage from "./NewsPage";
import {connect} from "react-redux";
import {
    setCurrentPageActionCreator,
    setNewsActionCreator,
    setNewsTotalCountActionCreator
} from "../../Redux/Reducers/NewsPageReducer";
import axios from "axios";


let mapStateToProps = (state) => {
    return {
        newsPage: state.newsPage,
        serverLink: state.authorizationPage.serverLink
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setNews: (newsData) => {
            dispatch(setNewsActionCreator(newsData))
        },

        setCurrentPage: (number) => {
            dispatch(setCurrentPageActionCreator(number))
        },

        setNewsTotalCount: (count) => {
            dispatch(setNewsTotalCountActionCreator(count))
        }
    }
}


class NewsPageService extends React.Component {

    componentDidMount() {
        axios.get(`http://${this.props.serverLink}/news?token=${localStorage.getItem("userToken")}&page=${this.props.newsPage.currentPage}&count=${this.props.newsPage.pageSize}`)
            .then(response => {
                if (response.data) {
                    this.props.setNews(response.data.items)
                    this.props.setNewsTotalCount(response.data.totalCount)
                }
            })
    }



    onSetCurrentPage = (number) => {
        this.props.setCurrentPage(number)
        axios.get(`http://${this.props.serverLink}/news?token=${localStorage.getItem("userToken")}&page=${number}&count=${this.props.newsPage.pageSize}`)
            .then(response => {
                this.props.setNews(response.data.items)
                this.props.setNewsTotalCount(response.data.totalCount)
            })
    }

    render() {
        return (
            <NewsPage onSetCurrentPage={this.onSetCurrentPage}
                      currentPage={this.props.newsPage.currentPage}
                      totalNewsCount={this.props.newsPage.totalNewsCount}
                      pageSize={this.props.newsPage.pageSize}
                      newsData={this.props.newsPage.newsData}/>
        )
    }
}


const NewsPageContainer = connect(mapStateToProps, mapDispatchToProps)(NewsPageService)

export default NewsPageContainer