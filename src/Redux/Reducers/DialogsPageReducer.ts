import {
    deleteDialogRequest,
    deleteMessageRequest,
    getDialogsRequest,
    getMessagesRequest,
    sendNewMessageRequest
} from "../../DAL/ApiRequests";

const SEND_MESSAGE = "SEND_MESSAGE";
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
    dialogsData: [] as Array<DialogType>,
    messagesData: [] as Array<MessageType>,
    currentDialogId: "" as string | number,
    setCurrentDialogInProgress: false as boolean,
    deleteDialogInProgress: false as boolean,
    deleteMessageInProgress: false as boolean,
    sendMessageInProgress: false as boolean,
};

export type DialogType = {
    idDialog?: number
    name?: string
    img?: string
}

export type MessageType = {
    senderId?: number
    id?: number
    name?: string
    date?: string
    time?: string
    img?: string
}

export type initialStateType = typeof initialDialogsPage

const dialogsPageReducer = (dialogsPage = initialDialogsPage, action: any): initialStateType => {

    switch (action.type) {


        case SEND_MESSAGE: {
            let newMessage = {
                id: action.id,
                name: action.name,
                text: action.text,
                img: action.img,
                time: action.time,
                senderId: action.senderId
            };
            return {
                ...dialogsPage,
                messagesData: [...dialogsPage.messagesData, newMessage],
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
                dialogsData: dialogsPage.dialogsData.map((d: any) => {
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
                messagesData: dialogsPage.messagesData.map((m: any) => {
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

export const sendMessage = (name: number, img: string, id: number, text: string, time: string, senderId: number) => {
    return {
        type: SEND_MESSAGE,
        name,
        img,
        id,
        text,
        time,
        senderId
    }
}
export const deleteDialog = (idDialog: number, message: string) => {
    return {
        type: DELETE_DIALOG,
        idDialog,
        message

    }
}

export const setMessages = (messagesData: Array<MessageType>) => {
    return {
        type: SET_MESSAGES,
        messagesData
    }
}

export const deleteMessage = (idMessage: number, message: string) => {
    return {
        type: DELETE_MESSAGE,
        idMessage,
        message
    }
}

export const setDialogs = (dialogsData: Array<DialogType>) => {
    return {
        type: SET_DIALOGS,
        dialogsData
    }
}

export const setCurrentDialog = (selectedDialogId: number | string) => {
    return {
        type: SET_CURRENT_DIALOG,
        selectedDialogId
    }
}

export const toggleSetCurrentDialogProgress = (setCurrentDialogInProgress: boolean) => {
    return {
        type: TOGGLE_SET_CURRENT_DIALOG_PROGRESS,
        setCurrentDialogInProgress
    }
}

export const toggleDeleteDialogProgress = (deleteDialogInProgress: boolean) => {
    return {
        type: TOGGLE_DELETE_DIALOG_PROGRESS,
        deleteDialogInProgress
    }
}
export const toggleDeleteMessageProgress = (deleteMessageInProgress: boolean) => {
    return {
        type: TOGGLE_DELETE_MESSAGE_PROGRESS,
        deleteMessageInProgress
    }
}

export const toggleSendMessageProgress = (sendMessageInProgress: boolean) => {
    return {
        type: TOGGLE_SEND_MESSAGE_PROGRESS,
        sendMessageInProgress
    }
}

export const setDialogsThunkCreator = (currentDialogId: number) => {
    return async (dispatch:Function) => {
        const data = await getDialogsRequest()
        if (data) {
            dispatch(setDialogs(data.items))
        }
        if (currentDialogId) {
            const data = await getMessagesRequest(currentDialogId)
            if (data) {
                dispatch(setMessages(data.items))
            } else if (data === null) {
                dispatch(setMessages([]))
            }

        }

    }
}

export const deleteDialogThunkCreator = (idDialog: number, currentDialogId: number) => {
    return async (dispatch: Function) => {
        dispatch(toggleDeleteDialogProgress(true))
        const data = await deleteDialogRequest(idDialog)
        dispatch(deleteDialog(idDialog, data.message))
        if (currentDialogId === idDialog) {
            dispatch(setCurrentDialog(""))
        }
        dispatch(toggleDeleteDialogProgress(false))
    }
}

export const deleteMessageThunkCreator = (dialogId: number, idMessage: number) => {
    return async (dispatch: Function) => {
        dispatch(toggleDeleteMessageProgress(true))
        const data = await deleteMessageRequest(dialogId, idMessage)
        dispatch(deleteMessage(idMessage, data.message))
        dispatch(toggleDeleteMessageProgress(false))
    }
}

export const cetCurrentDialogThunkCreator = (idDialog: number) => {
    return async (dispatch: Function) => {
        dispatch(toggleSetCurrentDialogProgress(true))
        const data = await getMessagesRequest(idDialog)
        if (data) {
            dispatch(setMessages(data.items))
        } else if (data === null) {
            dispatch(setMessages([]))
        }
        dispatch(toggleSetCurrentDialogProgress(false))
    }
}

export const sendMessageThunkCreator = (dialogId: number, messageText: string) => {
    return async (dispatch: Function) => {
        dispatch(toggleSendMessageProgress(true))
        const data = await sendNewMessageRequest(dialogId, messageText)
                dispatch(sendMessage(data[0].name, data[0].img, data[0].id, data[0].text, data[0].time, data[0].senderId))
                dispatch(toggleSendMessageProgress(false))
    }
}

export default dialogsPageReducer








