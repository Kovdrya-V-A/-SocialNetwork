import React from 'react';
import {
    messageTextChangeActionCreator,
    sendMessageActionCreator, setDialogsActionCreator,
    setMessageActionCreator
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
        sendNewMessage: () => {
            dispatch(sendMessageActionCreator())
        },
        messageTextChange: (text) => {
            dispatch(messageTextChangeActionCreator(text))
        },
        setMessages: (messagesData) => {
            dispatch(setMessageActionCreator(messagesData))
        },
        setDialogs: (dialogsData) => {
            dispatch(setDialogsActionCreator(dialogsData))
        }
    }
}

const DialogsPageContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsPage)

export default DialogsPageContainer;