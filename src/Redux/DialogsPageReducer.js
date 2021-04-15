const SEND_MASSAGE = "SEND_MASSAGE";
const MASSAGE_TEXT_CHANGE = "MASSAGE_TEXT_CHANGE";
const SET_MASSAGE = "SET_MASSAGE"
const SET_DIALOGS = "SET_DIALOGS"

let initialDialogsPage = {
    dialogsData: [],

    newMassageText: "",

    massagesData: []
};

const dialogsPageReducer = (dialogsPage = initialDialogsPage, action) => {
    switch (action.type) {
        case SEND_MASSAGE: {
            let newMassage = {
                id: 5,
                massage: dialogsPage.newMassageText,
                senderName: "Михуил",
                senderAva: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album"
            };
            if (newMassage.massage != "") {
                return {
                    ...dialogsPage,
                    massagesData: [...dialogsPage.massagesData, newMassage],
                    newMassageText: ""
                };
            } else {
                alert("Текст сообщения не может быть пустым !")
            }
            return dialogsPage;

        }

        case MASSAGE_TEXT_CHANGE: {
            return {
                ...dialogsPage,
                newMassageText: action.enteredMassageText
            };
        }

        case SET_MASSAGE: {
            return {
                ...dialogsPage,
                massagesData: [...dialogsPage.massagesData, ...action.massagesData]
            }
        }

        case SET_DIALOGS: {
            return {
                ...dialogsPage,
                dialogsData: [...dialogsPage.dialogsData, ...action.dialogsData]
            }
        }

        default:
            return dialogsPage;
    }

}

export const sendMassageActionCreator = () => {
    return {
        type: SEND_MASSAGE
    }
}
export const massageTextChangeActionCreator = (text) => {
    return {
        type: MASSAGE_TEXT_CHANGE,
        enteredMassageText: text.current.value,
    }
}

export const setMassageActionCreator = (massagesData) => {
    return {
        type: SET_MASSAGE,
        massagesData
    }
}

export const setDialogsActionCreator = (dialogsData) => {
    return {
        type: SET_DIALOGS,
        dialogsData
    }
}


export default dialogsPageReducer;