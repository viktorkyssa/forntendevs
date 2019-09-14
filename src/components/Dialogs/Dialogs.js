import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const Dialogs = (props) => {
  let state = props.messagesPage

  let dialogsTemplate = state.dialogs.map(dialog => <DialogItem key={dialog.id} dialogsData={dialog} />)
  let messagesTemplate = state.messages.map(message => <Message key={message.id} text={message.message} />)

  const addNewMessage = (values) => {
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

const AddMessageForm = (props) => {

    return(
        <form  onSubmit={props.handleSubmit} className={classes.send_message}>
            <Field component={Textarea} name={"newMessageBody"} placeholder={"Enter Your Message"}
                   validate={[required, maxLength50]}/>
            <button className="btn">Send</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs
