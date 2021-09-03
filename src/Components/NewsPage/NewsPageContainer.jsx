import React from 'react';
import NewsPage from "./NewsPage";
import {connect} from "react-redux";
import {
    setCurrentPageThunkCreator,
    setNewsThunkCreator,
} from "../../Redux/Reducers/NewsPageReducer";
import {CheckAuthRedirect} from "../../HOC/CheckAuth";


let mapStateToProps = (state) => {
    return {
        newsPage: state.newsPage,
        serverLink: state.authorizationPage.serverLink,
    }
}


class NewsPageService extends React.Component {

    componentDidMount() {
        this.props.setNewsThunkCreator(this.props.newsPage.currentPage, this.props.newsPage.pageSize)
    }


    onSetCurrentPage = (number) => {
        this.props.setCurrentPageThunkCreator(number, this.props.newsPage.pageSize)
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

let CheckAuthNewsPage = CheckAuthRedirect (NewsPageService)


const NewsPageContainer = connect(mapStateToProps, {
    setNewsThunkCreator,
    setCurrentPageThunkCreator
})(CheckAuthNewsPage)

export default NewsPageContainer