import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form"

import {Textarea} from "../common/FormsControls/FormsControls"
import {maxLengthCreator, required} from "../../utils/validators/validators"
import {InitialStateType} from "../../redux/messages-reducer"

import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

import classes from './Dialogs.module.css'

type PropsType = {
    messagesPage: InitialStateType,
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
  let state = props.messagesPage

  let dialogsTemplate = state.dialogs.map(dialog => <DialogItem key={dialog.id} {...dialog} />)
  let messagesTemplate = state.messages.map(message => <Message key={message.id} {...message} />)

  const addNewMessage = (values: NewMessageFormValuesType) => {
      props.sendMessage(values.newMessageBody)
  }

  return (
    <div className={classes.dialogs}>
      <ul className={classes.dialogs_items}>
        {dialogsTemplate}
      </ul>
      <div className={classes.messages}>
        {messagesTemplate}
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  )
}

const maxLength50 = maxLengthCreator(50)

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type AddMessageFormProps = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, AddMessageFormProps> & AddMessageFormProps> = (props) => {

    return(
        <form  onSubmit={props.handleSubmit} className={classes.send_message}>
            <Field component={Textarea} name={"newMessageBody"} placeholder={"Enter Your Message"}
                   validate={[required, maxLength50]}/>
            <button className="btn">Send</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs
