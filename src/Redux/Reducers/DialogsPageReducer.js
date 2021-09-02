import {
    deleteDialogRequest,
    deleteMessageRequest,
    getDialogsRequest,
    getMessagesRequest,
    sendNewMessageRequest
} from "../../DAL/ApiRequests";

const SEND_MESSAGE = "SEND_MESSAGE";
const MESSAGE_TEXT_CHANGE = "MESSAGE_TEXT_CHANGE";
const SET_MESSAGES = "SET_MESSAGES";
const SET_DIALOGS = "SET_DIALOGS";
const SET_CURRENT_DIALOG = "SET_CURRENT_DIALOG";
const DELETE_DIALOG = "DELETE_DIALOG";
const DELETE_MESSAGE = "DELETE_MESSAGE";
const TOGGLE_SET_CURRENT_DIALOG_PROGRESS = "TOGGLE_SET_CURRENT_DIALOG_PROGRESS";
const TOGGLE_DELETE_DIALOG_PROGRESS = "TOGGLE_DELETE_DIALOG_PROGRESS";
const TOGGLE_DELETE_MESSAGE_PROGRESS = "TOGGLE_DELETE_MESSAGE_PROGRESS";
const TOGGLE_SEND_MESSAGE_PROGRESS = "TOGGLE_SEND_MESSAGE_PROGRESS";

let initialDialogsPage = {
    dialogsData: [],
    newMessageText: "",
    messagesData: [],
    currentDialogId: "",
    setCurrentDialogInProgress: false,
    deleteDialogInProgress: false,
    deleteMessageInProgress: false,
    sendMessageInProgress: false,
};

const dialogsPageReducer = (dialogsPage = initialDialogsPage, action) => {

    switch (action.type) {


        case SEND_MESSAGE: {
            let newMessage = {
                id: action.id,
                name: action.name,
                text: action.text,
                img: action.img,
                time: action.time
            };
            return {
                ...dialogsPage,
                messagesData: [...dialogsPage.messagesData, newMessage],
                newMessageText: ""
            };
        }


        case MESSAGE_TEXT_CHANGE: {
            return {
                ...dialogsPage,
                newMessageText: action.enteredMessageText
            };
        }

        case SET_MESSAGES: {
            return {
                ...dialogsPage,
                messagesData: [...action.messagesData]
            }
        }

        case DELETE_DIALOG: {
            return {
                ...dialogsPage,
                dialogsData: dialogsPage.dialogsData.map(d => {
                    if (d.idDialog === action.idDialog) {
                        return {...d, isDeleted: true}
                    }
                    return d
                })
            }
        }

        case DELETE_MESSAGE: {
            return {
                ...dialogsPage,
                messagesData: dialogsPage.messagesData.map(m => {
                    if (m.id === action.idMessage) {
                        return {...m, isDeleted: true}
                    }
                    return m
                })
            }
        }

        case SET_DIALOGS: {
            return {
                ...dialogsPage,
                dialogsData: [...action.dialogsData]
            }
        }

        case SET_CURRENT_DIALOG: {
            return {
                ...dialogsPage,
                currentDialogId: action.selectedDialogId
            }
        }

        case TOGGLE_SET_CURRENT_DIALOG_PROGRESS:
            return {
                ...dialogsPage,
                setCurrentDialogInProgress: action.setCurrentDialogInProgress
            }
        case TOGGLE_DELETE_DIALOG_PROGRESS:
            return {
                ...dialogsPage,
                deleteDialogInProgress: action.deleteDialogInProgress
            }

        case TOGGLE_DELETE_MESSAGE_PROGRESS:
            return {
                ...dialogsPage,
                deleteMessageInProgress: action.deleteMessageInProgress
            }

        case TOGGLE_SEND_MESSAGE_PROGRESS:
            return {
                ...dialogsPage,
                sendMessageInProgress: action.sendMessageInProgress
            }


        default:
            return dialogsPage;
    }

}

export const sendMessage = (name, img, id, text, time) => {
    return {
        type: SEND_MESSAGE,
        name: name,
        img: img,
        id: id,
        text: text,
        time: time
    }
}
export const deleteDialog = (idDialog, message) => {
    return {
        type: DELETE_DIALOG,
        idDialog: idDialog,
        message: message

    }
}
export const messageTextChange = (text) => {
    return {
        type: MESSAGE_TEXT_CHANGE,
        enteredMessageText: text.current.value,
    }
}

export const setMessages = (messagesData) => {
    return {
        type: SET_MESSAGES,
        messagesData
    }
}

export const deleteMessage = (idMessage, message) => {
    return {
        type: DELETE_MESSAGE,
        idMessage,
        message
    }
}

export const setDialogs = (dialogsData) => {
    return {
        type: SET_DIALOGS,
        dialogsData
    }
}

export const setCurrentDialog = (selectedDialogId) => {
    return {
        type: SET_CURRENT_DIALOG,
        selectedDialogId
    }
}

export const toggleSetCurrentDialogProgress = (setCurrentDialogInProgress) => {
    return {
        type: TOGGLE_SET_CURRENT_DIALOG_PROGRESS,
        setCurrentDialogInProgress
    }
}

export const toggleDeleteDialogProgress = (deleteDialogInProgress) => {
    return {
        type: TOGGLE_DELETE_DIALOG_PROGRESS,
        deleteDialogInProgress
    }
}
export const toggleDeleteMessageProgress = (deleteMessageInProgress) => {
    return {
        type: TOGGLE_DELETE_MESSAGE_PROGRESS,
        deleteMessageInProgress
    }
}

export const toggleSendMessageProgress = (sendMessageInProgress) => {
    return {
        type: TOGGLE_SEND_MESSAGE_PROGRESS,
        sendMessageInProgress
    }
}

export const setDialogsThunkCreator = (currentDialogId) => {
    return (dispatch) => {
        getDialogsRequest()
            .then(data => {
                if (data) {
                  dispatch(  setDialogs(data.items))
                }
                if (currentDialogId) {
                    getMessagesRequest(currentDialogId)
                        .then(data => {
                            if (data) {
                                dispatch(setMessages(data.items))
                            } else if (data === null) {
                                dispatch(setMessages([]))
                            }
                        })
                }
            })
    }
}

export const deleteDialogThunkCreator = (idDialog, currentDialogId) => {
    return (dispatch) => {
        dispatch(toggleDeleteDialogProgress(true))
        deleteDialogRequest(idDialog)
            .then(data => {
                dispatch(deleteDialog(idDialog, data.message))
                if (currentDialogId === idDialog) {
                    dispatch(setCurrentDialog(""))
                }
                dispatch(toggleDeleteDialogProgress(false))
            })
    }
}

export const deleteMessageThunkCreator = (dialogId, idMessage) => {
    return (dispatch) => {
        dispatch(toggleDeleteMessageProgress(true))
        deleteMessageRequest(dialogId, idMessage)
            .then(data => {
                dispatch(deleteMessage(idMessage, data.message))
                dispatch(toggleDeleteMessageProgress(false))
            })
    }
}

export const cetCurrentDialogThunkCreator = (idDialog) => {
    return (dispatch) => {
        dispatch(toggleSetCurrentDialogProgress(true))
        getMessagesRequest(idDialog)
            .then(data => {
                if (data) {
                   dispatch( setMessages(data.items))
                } else if (data === null) {
                    dispatch(setMessages([]))
                }
                dispatch(toggleSetCurrentDialogProgress(false))
            })
    }
}

export const sendMessageThunkCreator = (dialogId, messageText) => {
    return (dispatch) => {
        dispatch(toggleSendMessageProgress(true))
        sendNewMessageRequest(dialogId, messageText)
            .then(data => {
              dispatch(sendMessage(data[0].name, data[0].img, data[0].id, data[0].text, data[0].time))
              dispatch(toggleSendMessageProgress(false))
            })
    }
}


export default dialogsPageReducer;