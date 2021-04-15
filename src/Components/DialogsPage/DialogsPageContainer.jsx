import React from 'react';
import {
    massageTextChangeActionCreator,
    sendMassageActionCreator, setDialogsActionCreator,
    setMassageActionCreator
} from "../../Redux/DialogsPageReducer";
import {connect} from "react-redux";
import DialogsPage from "./DialogsPage";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendNewMassage: () => {
            dispatch(sendMassageActionCreator())
        },
        massageTextChange: (text) => {
            dispatch(massageTextChangeActionCreator(text))
        },
        setMassages: (massagesData) => {
            dispatch(setMassageActionCreator(massagesData))
        },
        setDialogs: (dialogsData) => {
            dispatch(setDialogsActionCreator(dialogsData))
        }
    }
}

const DialogsPageContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsPage)

export default DialogsPageContainer;