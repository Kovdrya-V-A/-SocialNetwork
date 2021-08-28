import React from 'react';
import {
    deleteDialogActionCreator, deleteMessageActionCreator,
    messageTextChangeActionCreator,
    sendMessageActionCreator, setCurrentDialogActionCreator, setDialogsActionCreator,
    setMessageActionCreator,
} from "../../Redux/Reducers/DialogsPageReducer";
import {connect} from "react-redux";
import DialogsPage from "./DialogsPage";
import * as axios from "axios";
import {withRouter} from "react-router-dom";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        serverLink: state.authorizationPage.serverLink,
    }
}

class DialogsPageContainer extends React.Component {

    componentDidMount = () => {
        debugger
        axios.get(`http://${this.props.serverLink}/dialogs?token=${localStorage.getItem("userToken")}`)
            .then(response => {
                if (response.data) {
                    this.props.setDialogs(response.data.items)
                }
                if (this.props.dialogsPage.currentDialogId) {
                    axios.get(`http://${this.props.serverLink}/messages?token=${localStorage.getItem("userToken")}&idDialog=${this.props.dialogsPage.currentDialogId}`)
                        .then(response => {
                            if (response.data) {
                                this.props.setMessages(response.data.items)
                            } else if (response.data === null) {
                                this.props.setMessages([])
                            }
                        })
                }
            })
    }


    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //
    //     if (this.props.dialogsPage.messagesData === nextProps.dialogsPage.messagesData &&
    //         this.props.dialogsPage.dialogsData === nextProps.dialogsPage.dialogsData
    //     ) {
    //         return false
    //     }
    //     return true
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillUnmount = () => {
        this.props.setCurrentDialog("")
    }


    onDeleteDialog = (idDialog) => {
        axios.post(`http://${this.props.serverLink}/createDialog`, {
            "token": localStorage.getItem("userToken"),
            "idDialog": idDialog,
            "isDelete": true
        })
            .then(response => {
                this.props.deleteDialog(idDialog, response.data.message)
                if (this.props.dialogsPage.currentDialogId === idDialog) {
                    this.props.setCurrentDialog("")
                }
            })
    }

    onDeleteMassage = (idMessage) => {
        let dialogId = this.props.match.params.dialogId
        axios.post(`http://${this.props.serverLink}/sendMessage`,
            {
                "token": localStorage.getItem("userToken"),
                "idDialog": dialogId,
                "idMessage": idMessage,
                "isDelete": true
            })
            .then(response => {
                this.props.deleteMessage(idMessage, response.data.message)
            })
    }


    onSetCurrentDialog = (selectedDialogId) => {
        this.props.setCurrentDialog(selectedDialogId)
        let dialogId = window.location.pathname.split("/")
        let a = dialogId.length - 1

        // ws.send(JSON.stringify({
        //     token: localStorage.getItem("userToken"),
        //     command: "checkMessages", idDialog: dialogId[a]
        // }))


        axios.get(`http://${this.props.serverLink}/messages?token=${localStorage.getItem("userToken")}&idDialog=${dialogId[a]}`)
            .then(response => {
                if (response.data) {
                    this.props.setMessages(response.data.items)
                } else if (response.data === null) {
                    this.props.setMessages([])
                }
            })
    }


    onSendNewMessage = (messageText) => {
        if (messageText) {
            // let dialogId = window.location.pathname.split("/")
            let dialogId = this.props.match.params.dialogId
            // let a = dialogId.length - 1

            // ws.send(JSON.stringify({
            //     token: localStorage.getItem("userToken"),
            //     command: "sendMessage", text: messageText,
            //     idDialog: dialogId[a]
            // }))

            axios.post(`http://${this.props.serverLink}/sendMessage`,
                {
                    "token": localStorage.getItem("userToken"),
                    "idDialog": dialogId,
                    "text": messageText,
                })
                .then(response => {
                    this.props.sendNewMessage(response.data[0].name, response.data[0].img, response.data[0].id, response.data[0].text, response.data[0].time);
                })
        }
    }

    onMessageTextChange = (text) => {
        this.props.messageTextChange(text)
    }


    render() {
        return (
            <DialogsPage
                dialogsData={this.props.dialogsPage.dialogsData}
                messagesData={this.props.dialogsPage.messagesData}
                newMessageText={this.props.dialogsPage.newMessageText}
                onMessageTextChange={this.onMessageTextChange}
                onSendNewMessage={this.onSendNewMessage}
                currentDialogId={this.props.dialogsPage.currentDialogId}
                onSetCurrentDialog={this.onSetCurrentDialog}
                onDeleteDialog={this.onDeleteDialog}
                onDeleteMassage={this.onDeleteMassage}
                setMessages={this.props.setMessages}
            />
        )
    }
}

let WithRouterDialogsPageContainer = withRouter(DialogsPageContainer)

export default connect(mapStateToProps, {
    sendNewMessage: sendMessageActionCreator,
    messageTextChange: messageTextChangeActionCreator,
    setMessages: setMessageActionCreator,
    setDialogs: setDialogsActionCreator,
    setCurrentDialog: setCurrentDialogActionCreator,
    deleteDialog: deleteDialogActionCreator,
    deleteMessage: deleteMessageActionCreator,

})(WithRouterDialogsPageContainer)
