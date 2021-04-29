const SEND_MESSAGE = "SEND_MESSAGE";
const MESSAGE_TEXT_CHANGE = "MESSAGE_TEXT_CHANGE";
const SET_MESSAGE = "SET_MESSAGE";
const SET_DIALOGS = "SET_DIALOGS";
const SET_CURRENT_DIALOG = "SET_CURRENT_DIALOG";

let initialDialogsPage = {
    dialogsData: [],

    newMessageText: "",

    messagesData: [],

    currentDialogId: ""
};

const dialogsPageReducer = (dialogsPage = initialDialogsPage, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                id: 5,
                message: dialogsPage.newMessageText,
                senderName: "Михуил",
                senderAva: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album"
            };
            if (newMessage.message != "") {
                return {
                    ...dialogsPage,
                    messagesData: [...dialogsPage.messagesData, newMessage],
                    newMessageText: ""
                };
            } else {
                alert("Текст сообщения не может быть пустым !")
            }
            return dialogsPage;

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
                messagesData: [...dialogsPage.messagesData, ...action.messagesData]
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

        default:
            return dialogsPage;
    }

}

export const sendMessageActionCreator = () => {
    return {
        type: SEND_MESSAGE
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


export default dialogsPageReducer;