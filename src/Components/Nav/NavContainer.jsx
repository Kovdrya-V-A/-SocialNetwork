import React from 'react';
import {connect} from "react-redux";
import Nav from "./Nav";
import {setCurrentDialog} from "../../Redux/Reducers/DialogsPageReducer";
import {resetVerification} from "../../Redux/AuthoRegReducers/AuthorizationPageReducer";


let mapStateToProps = (state) => {
    return {}
}


class NavService extends React.Component {

    componentDidMount() {
    }

    onGoToDialogsPage = (number) => {
        this.props.setCurrentDialog(number)
    }

    onExit = () => {
        this.props.resetVerification()
    }

    render() {
        return (
            <Nav onGoToDialogsPage={this.onGoToDialogsPage}
                 onExit = {this.onExit}/>
        )
    }
}

const NavContainer = connect(mapStateToProps, {
    setCurrentDialog, resetVerification,
})(NavService)

export default NavContainer;