import React from 'react';
import {
    deleteDialogActionCreator, deleteMessageActionCreator,
    messageTextChangeActionCreator,
    sendMessageActionCreator, setCurrentDialogActionCreator, setDialogsActionCreator,
    setMessageActionCreator,
} from "../../Redux/Reducers/DialogsPageReducer";
import {connect} from "react-redux";
import DialogsPage from "./DialogsPage";
import {withRouter} from "react-router-dom";
import {
    deleteDialogRequest,
    deleteMessageRequest,
    getDialogsRequest,
    getMessagesRequest,
    sendNewMessageRequest
} from "../../DAL/ApiRequests";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        serverLink: state.authorizationPage.serverLink,
    }
}

class DialogsPageContainer extends React.Component {

    componentDidMount = () => {
        getDialogsRequest()
            .then(data => {
                if (data) {
                    this.props.setDialogs(data.items)
                }
                if (this.props.dialogsPage.currentDialogId) {
                    getMessagesRequest(this.props.dialogsPage.currentDialogId)
                        .then(data => {
                            if (data) {
                                this.props.setMessages(data.items)
                            } else if (data === null) {
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
        deleteDialogRequest(idDialog)
            .then(data => {
                this.props.deleteDialog(idDialog, data.message)
                if (this.props.dialogsPage.currentDialogId === idDialog) {
                    this.props.setCurrentDialog("")
                }
            })
    }

    onDeleteMassage = (idMessage) => {
        let dialogId = this.props.match.params.dialogId
        deleteMessageRequest(dialogId, idMessage)
            .then(data => {
                this.props.deleteMessage(idMessage, data.message)
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


        getMessagesRequest(dialogId[a])
            .then(data => {
                if (data) {
                    this.props.setMessages(data.items)
                } else if (data === null) {
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

            sendNewMessageRequest(dialogId, messageText)
                .then(data => {
                    this.props.sendNewMessage(data[0].name, data[0].img, data[0].id, data[0].text, data[0].time);
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
