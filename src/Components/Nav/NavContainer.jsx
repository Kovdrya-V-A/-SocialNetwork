import React from 'react';
import {connect} from "react-redux";
import Nav from "./Nav";
import {setCurrentDialog} from "../../Redux/Reducers/DialogsPageReducer";
import {resetVerificationThunkCreator} from "../../Redux/AuthoRegReducers/AuthorizationPageReducer";


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
        this.props.resetVerificationThunkCreator()
    }

    render() {
        return (
            <Nav onGoToDialogsPage={this.onGoToDialogsPage}
                 onExit = {this.onExit}/>
        )
    }
}

const NavContainer = connect(mapStateToProps, {
    setCurrentDialog, resetVerificationThunkCreator,
})(NavService)

export default NavContainer;