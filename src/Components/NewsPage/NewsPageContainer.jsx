import React from 'react';
import NewsPage from  "./NewsPage";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
        return {
            newsPage: state.newsPage
        }
}

let mapDispatchToProps = (dispatch) => {
    return {

    }
}

const NewsPageContainer = connect(mapStateToProps, mapDispatchToProps)(NewsPage)
export default NewsPageContainer