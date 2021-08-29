import React from 'react';
import NewsPage from "./NewsPage";
import {connect} from "react-redux";
import {
    setCurrentPageActionCreator,
    setNewsActionCreator,
    setNewsTotalCountActionCreator
} from "../../Redux/Reducers/NewsPageReducer";
import {getNewsRequest} from "../../DAL/ApiRequests";


let mapStateToProps = (state) => {
    return {
        newsPage: state.newsPage,
        serverLink: state.authorizationPage.serverLink
    }
}


class NewsPageService extends React.Component {

    componentDidMount() {
        getNewsRequest(this.props.newsPage.currentPage, this.props.newsPage.pageSize)
            .then(data => {
                if (data) {
                    this.props.setNews(data.items)
                    this.props.setNewsTotalCount(data.totalCount)
                }
            })
    }


    onSetCurrentPage = (number) => {
        this.props.setCurrentPage(number)
        getNewsRequest(number, this.props.newsPage.pageSize)
            .then(data => {
                this.props.setNews(data.items)
                this.props.setNewsTotalCount(data.totalCount)
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


const NewsPageContainer = connect(mapStateToProps, {
    setNews: setNewsActionCreator,
    setCurrentPage: setCurrentPageActionCreator,
    setNewsTotalCount: setNewsTotalCountActionCreator
})(NewsPageService)

export default NewsPageContainer