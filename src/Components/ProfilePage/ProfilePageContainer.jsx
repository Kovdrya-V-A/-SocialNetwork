import React from 'react';
import {connect} from "react-redux";
import ProfilePage from "./ProfilePage";
import {CheckAuthRedirect} from "../../HOC/CheckAuth.jsx";
import {compose} from "redux";
import {withRouter} from "react-router-dom";


let mapStateToProps = (state) => {
    return {
    }
}


class profilePageContainer extends React.Component {


    componentDidUpdate(prevProps, prevState, snapshot) {
        alert(1)
    }


    componentDidMount() {

    }


    render() {
        let profileId = this.props.match.params.profileId
        return (
            <ProfilePage profileId = {profileId||null}/>
        )
    }

}

export default compose(
    withRouter,
    connect(mapStateToProps, {}),
    CheckAuthRedirect,
)(profilePageContainer)
