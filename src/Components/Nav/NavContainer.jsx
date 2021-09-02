import React from 'react';
import {connect} from "react-redux";
import Nav from "./Nav";
import {setCurrentDialog} from "../../Redux/Reducers/DialogsPageReducer";


let mapStateToProps = (state) => {
    return {}
}


class NavService extends React.Component {

    componentDidMount() {
    }

    onGoToDialogsPage = (number) => {
        this.props.setCurrentDialog(number)
    }

    render() {
        return (
            <Nav onGoToDialogsPage={this.onGoToDialogsPage}/>
        )
    }
}

const NavContainer = connect(mapStateToProps, {
    setCurrentDialog,
})(NavService)

export default NavContainer;