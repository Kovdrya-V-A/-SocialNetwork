import s from "../DialogsPage.module.css";
import React from "react";
import Message from "./Message/Message";
import {Field, reduxForm, reset} from "redux-form";
import {CreateFormItem} from "../../Common/FormsElements/FormsElements";
import {checkLenghtCreator} from "../../Common/Validators/Validators";


const MessagesBar = (props) => {

    const onSubmit = (formData, dispatch) => {
        props.onSendNewMessage(formData.messageText)
        dispatch(reset("sendMessage"))
    }



    let messagesItems = props.messagesData.map(m => m.isDeleted ? null : <Message
        deleteMessageInProgress={props.deleteMessageInProgress}
        key={m.id}
        senderName={m.name}
        text={m.text}
        senderAva={m.img}
        time={m.time}
        idMessage={m.id}
        onDeleteMessage={props.onDeleteMassage}
        senderId={m.senderId}
    />)

    return (
        <div className={s.messageBar}>
            {props.messagesData.length > 0 ? messagesItems :
                <p className={s.nullMessagesMessage}>В этом диалоге пока нет сообщений</p>}
            <ReduxSendingMessageForm sendMessageInProgress = {props.sendMessageInProgress} onSubmit = {onSubmit}
            />
        </div>
    )
}

const TextAreaForm =  CreateFormItem("textarea")
const requiredLength = checkLenghtCreator(0, 350)

const SendingMessageForm = (props) => {
    return <form
        className={s.sendMessageForm}
        onSubmit={props.handleSubmit}>
        <Field placeholder="Ваше сообщение"
               name="messageText" validate={[requiredLength]} component={TextAreaForm}/>
        <button disabled={props.sendMessageInProgress} className={s.sendMessageButton}>Send message
        </button>
    </form>
}

const ReduxSendingMessageForm = reduxForm({
    form: "sendMessage",
})(SendingMessageForm)




export default React.memo(MessagesBar)