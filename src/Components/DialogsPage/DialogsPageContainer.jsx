import React from 'react';
import {connect} from "react-redux";
import DialogsPage from "./DialogsPage";
import {withRouter} from "react-router-dom";
import {
    deleteDialogRequest,
    deleteMessageRequest,
    getMessagesRequest,
    sendNewMessageRequest
} from "../../DAL/ApiRequests";
import {
    cetCurrentDialogThunkCreator,
    deleteDialog, deleteDialogThunkCreator,
    deleteMessage, deleteMessageThunkCreator,
    messageTextChange,
    sendMessage, sendMessageThunkCreator,
    setCurrentDialog,
    setDialogs, setDialogsThunkCreator,
    setMessages,
    toggleDeleteDialogProgress,
    toggleDeleteMessageProgress,
    toggleSendMessageProgress,
    toggleSetCurrentDialogProgress
} from "../../Redux/Reducers/DialogsPageReducer";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        serverLink: state.authorizationPage.serverLink,
    }
}

class DialogsPageContainer extends React.Component {

    componentDidMount = () => {
        this.props.setDialogsThunkCreator(this.props.dialogsPage.currentDialogId)
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
        this.props.deleteDialogThunkCreator(idDialog, this.props.dialogsPage.currentDialogId)
    }

    onDeleteMassage = (idMessage) => {
        let dialogId = this.props.match.params.dialogId
        this.props.deleteMessageThunkCreator(dialogId, idMessage)
    }


    onSetCurrentDialog = (selectedDialogId) => {
        this.props.setCurrentDialog(selectedDialogId)
        let dialogId = window.location.pathname.split("/")
        let a = dialogId.length - 1
        let idDialog = dialogId[a]
        this.props.cetCurrentDialogThunkCreator(idDialog)

        // ws.send(JSON.stringify({
        //     token: localStorage.getItem("userToken"),
        //     command: "checkMessages", idDialog: dialogId[a]
        // }))

    }


    onSendNewMessage = (messageText) => {
        if (messageText) {
            let dialogId = this.props.match.params.dialogId
            this.props.sendMessageThunkCreator(dialogId, messageText)

            // ws.send(JSON.stringify({
            //     token: localStorage.getItem("userToken"),
            //     command: "sendMessage", text: messageText,
            //     idDialog: dialogId[a]
            // }))
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
                setCurrentDialogInProgress={this.props.dialogsPage.setCurrentDialogInProgress}
                deleteDialogInProgress={this.props.dialogsPage.deleteDialogInProgress}
                deleteMessageInProgress={this.props.dialogsPage.deleteMessageInProgress}
                sendMessageInProgress={this.props.dialogsPage.sendMessageInProgress}
            />
        )
    }
}

let WithRouterDialogsPageContainer = withRouter(DialogsPageContainer)

export default connect(mapStateToProps, {
    messageTextChange,
    setCurrentDialog,
    toggleSetCurrentDialogProgress,
    toggleDeleteDialogProgress,
    toggleDeleteMessageProgress,
    toggleSendMessageProgress,
    setDialogsThunkCreator,
    deleteDialogThunkCreator,
    deleteMessageThunkCreator,
    cetCurrentDialogThunkCreator,
    sendMessageThunkCreator,
})(WithRouterDialogsPageContainer)
