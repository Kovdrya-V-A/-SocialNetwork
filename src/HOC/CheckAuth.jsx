import * as React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


export const CheckAuthRedirect = (Component) => {

    let mapStateToProps = (state) => {
        return {
            auth: state.authorizationPage.auth
        }
    }

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.auth) return <Redirect to={"/Auth"}/>
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToProps, {})(RedirectComponent)
}
