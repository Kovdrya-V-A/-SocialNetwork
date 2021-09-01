const SEND_MESSAGE = "SEND_MESSAGE";
const MESSAGE_TEXT_CHANGE = "MESSAGE_TEXT_CHANGE";
const SET_MESSAGE = "SET_MESSAGE";
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

        case SET_MESSAGE: {
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

export const sendMessageActionCreator = (name, img, id, text, time) => {
    return {
        type: SEND_MESSAGE,
        name: name,
        img: img,
        id: id,
        text: text,
        time: time
    }
}
export const deleteDialogActionCreator = (idDialog, message) => {
    return {
        type: DELETE_DIALOG,
        idDialog: idDialog,
        message: message

    }
}
export const messageTextChangeActionCreator = (text) => {
    return {
        type: MESSAGE_TEXT_CHANGE,
        enteredMessageText: text.current.value,
    }
}

export const setMessageActionCreator = (messagesData) => {
    return {
        type: SET_MESSAGE,
        messagesData
    }
}

export const deleteMessageActionCreator = (idMessage, message) => {
    return {
        type: DELETE_MESSAGE,
        idMessage,
        message
    }
}

export const setDialogsActionCreator = (dialogsData) => {
    return {
        type: SET_DIALOGS,
        dialogsData
    }
}

export const setCurrentDialogActionCreator = (selectedDialogId) => {
    return {
        type: SET_CURRENT_DIALOG,
        selectedDialogId
    }
}

export const toggleSetCurrentDialogProgressActionCreator = (setCurrentDialogInProgress) => {
    return {
        type: TOGGLE_SET_CURRENT_DIALOG_PROGRESS,
        setCurrentDialogInProgress
    }
}

export const toggleDeleteDialogProgressActionCreator = (deleteDialogInProgress) => {
    return {
        type: TOGGLE_DELETE_DIALOG_PROGRESS,
        deleteDialogInProgress
    }
}
export const toggleDeleteMessageProgressActionCreator = (deleteMessageInProgress) => {
    return {
        type: TOGGLE_DELETE_MESSAGE_PROGRESS,
        deleteMessageInProgress
    }
}

export const toggleSendMessageProgressActionCreator = (sendMessageInProgress) => {
    return {
        type: TOGGLE_SEND_MESSAGE_PROGRESS,
        sendMessageInProgress
    }
}


export default dialogsPageReducer;