import React, { FC, useEffect, useState } from "react"

import { ChatMessageType } from "../../api/chat-api"
import { useDispatch, useSelector } from "react-redux";
import { startMessagesListening, stopMessagesListening, sendMessage } from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";

const ChatPage: FC = () =>
    <div>
        <Chat/>
    </div>

const Chat: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div style={ { height: '400px', overflowY: 'auto' } }>
            { messages.map((m, idx) => <Message key={ idx } message={ m }/>) }
        </div>
    )
}


const Message: FC<{ message: ChatMessageType }> = ({ message }) =>
    <div>
        <img src={ message.photo } style={ { width: '30px' } } alt={ message.userName }/> <b>{ message.userName }</b>
        <br/>
        <p>{ message.message }</p>
        <hr/>
    </div>

const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (message) {
            dispatch(sendMessage(message))
            setMessage('')
        }
    }

    return (
        <div>
            <div>
                <textarea onChange={ e => setMessage(e.currentTarget.value) } value={ message }></textarea>
            </div>
            <button disabled={ false } onClick={ sendMessageHandler }>Send</button>
        </div>
    )
}


export default ChatPage