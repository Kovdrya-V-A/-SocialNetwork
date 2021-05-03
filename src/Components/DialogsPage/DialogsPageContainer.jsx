import React from 'react';
import {
    messageTextChangeActionCreator,
    sendMessageActionCreator, setCurrentDialogActionCreator, setDialogsActionCreator,
    setMessageActionCreator
} from "../../Redux/Reducers/DialogsPageReducer";
import {connect} from "react-redux";
import DialogsPage from "./DialogsPage";
import * as axios from "axios";
import s from "./Dialog/Dialog.module.css";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        serverLink: state.authorizationPage.serverLink
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
        },
        setCurrentDialog: (selectedDialogId) => {
            dispatch(setCurrentDialogActionCreator(selectedDialogId))
        }
    }
}


class DialogsPageService extends React.Component {

    componentDidMount() {

        axios.get(`http://${this.props.serverLink}/dialogs?token=${localStorage.getItem("userToken")}`)
            .then(response => {
                console.log(response)
                this.props.setDialogs(response.data.items)
            })

    }


    onSetCurrentDialog = (selectedDialogId) => {
        this.props.setCurrentDialog(selectedDialogId)
        let dialogId = window.location.pathname.split("/")
        let a = dialogId.length - 1
        axios.get(`http://${this.props.serverLink}/messages?token=${localStorage.getItem("userToken")}&idDialog=${dialogId[a]}`)
            .then(response => {
                console.log(response)
                this.props.setMessages(response.data.items)
            })
    }


    onSendNewMessage = () => {
        this.props.sendNewMessage();
    }

    onMessageTextChange = (text) => {
        this.props.messageTextChange(text)
    }

    // onSetMessages = () => {
    //     axios.get(`http://${this.props.serverLink}/messages?token=${localStorage.getItem("userToken")}$dialogId=${this.props.dialogsPage.currentDialogId}`)
    //         .then(response => {
    //             console.log(response)
    //             this.props.setMessages(response.data.items)
    //         })
    // }

    render() {

        return (
            <DialogsPage dialogsData={this.props.dialogsPage.dialogsData}
                         messagesData={this.props.dialogsPage.messagesData}
                         newMessageText={this.props.dialogsPage.newMessageText}
                         onMessageTextChange={this.onMessageTextChange}
                         onSendNewMessage={this.onSendNewMessage}
                         currentDialogId={this.props.dialogsPage.currentDialogId}
                         onSetCurrentDialog = {this.onSetCurrentDialog}
                         // onSetMessages = {this.onSetMessages}
            />
        )
    }
}

const DialogsPageContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsPageService)

export default DialogsPageContainer;