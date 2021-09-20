import React from 'react';
import {connect} from "react-redux";
import DialogsPage from "./DialogsPage";
import {withRouter} from "react-router-dom";
import {
    cetCurrentDialogThunkCreator,
    deleteDialogThunkCreator,
    deleteMessageThunkCreator,
    sendMessageThunkCreator,
    setCurrentDialog,
    setDialogsThunkCreator,


} from "../../Redux/Reducers/DialogsPageReducer";
import {CheckAuthRedirect} from "../../HOC/CheckAuth";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
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
        this.props.cetCurrentDialogThunkCreator(selectedDialogId)

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


    render() {
        return (
            <DialogsPage
               dialogsData={this.props.dialogsPage.dialogsData}
                messagesData={this.props.dialogsPage.messagesData}
                onSendNewMessage={this.onSendNewMessage}
                currentDialogId={this.props.dialogsPage.currentDialogId}
                onSetCurrentDialog={this.onSetCurrentDialog}
                onDeleteDialog={this.onDeleteDialog}
                onDeleteMassage={this.onDeleteMassage}
                setCurrentDialogInProgress={this.props.dialogsPage.setCurrentDialogInProgress}
                deleteDialogInProgress={this.props.dialogsPage.deleteDialogInProgress}
                deleteMessageInProgress={this.props.dialogsPage.deleteMessageInProgress}
                sendMessageInProgress={this.props.dialogsPage.sendMessageInProgress}
            />
        )
    }
}

export default compose(
    connect(mapStateToProps, {
        setCurrentDialog,
        setDialogsThunkCreator,
        deleteDialogThunkCreator,
        deleteMessageThunkCreator,
        cetCurrentDialogThunkCreator,
        sendMessageThunkCreator,
    }),
    CheckAuthRedirect,
    withRouter
)(DialogsPageContainer)


