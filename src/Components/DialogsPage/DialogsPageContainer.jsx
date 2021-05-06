import React from 'react';
import {
    messageTextChangeActionCreator,
    sendMessageActionCreator, setCurrentDialogActionCreator, setDialogsActionCreator,
    setMessageActionCreator
} from "../../Redux/Reducers/DialogsPageReducer";
import {connect} from "react-redux";
import DialogsPage from "./DialogsPage";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        serverLink: state.authorizationPage.serverLink,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage: (name, img, id, text) => {
            dispatch(sendMessageActionCreator(name, img, id, text))
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
                if (response.data) {
                    this.props.setDialogs(response.data.items)
                }
            })

    }


    onSetCurrentDialog = (selectedDialogId) => {
        this.props.setCurrentDialog(selectedDialogId)
        let dialogId = window.location.pathname.split("/")
        let a = dialogId.length - 1
        axios.get(`http://${this.props.serverLink}/messages?token=${localStorage.getItem("userToken")}&idDialog=${dialogId[a]}`)
            .then(response => {
                if (response.data) {
                    this.props.setMessages(response.data.items)
                } else if (response.data == null) {
                    this.props.setMessages([])
                }
            })
    }


    onSendNewMessage = (massageText) => {
        if (massageText) {
            let dialogId = window.location.pathname.split("/")
            let a = dialogId.length - 1
            axios.post(`http://${this.props.serverLink}/sendMessage`,
                {
                    "token": localStorage.getItem("userToken"),
                    "idDialog": dialogId[a],
                    "text": massageText
                })
                .then(response => {
                    this.props.sendNewMessage(response.data[0].name, response.data[0].img, response.data[0].id, response.data[0].text);
                })
        }
    }

    onMessageTextChange = (text) => {
        this.props.messageTextChange(text)
    }


    render() {

        return (
            <DialogsPage dialogsData={this.props.dialogsPage.dialogsData}
                         messagesData={this.props.dialogsPage.messagesData}
                         newMessageText={this.props.dialogsPage.newMessageText}
                         onMessageTextChange={this.onMessageTextChange}
                         onSendNewMessage={this.onSendNewMessage}
                         currentDialogId={this.props.dialogsPage.currentDialogId}
                         onSetCurrentDialog={this.onSetCurrentDialog}

            />
        )
    }
}

const DialogsPageContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsPageService)

export default DialogsPageContainer;