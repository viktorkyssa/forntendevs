import React, { FC, useEffect, useRef, useState } from "react"

import { ChatMessageAPIType } from "../../api/chat-api"
import { useDispatch, useSelector } from "react-redux"
import { startMessagesListening, stopMessagesListening, sendMessage } from "../../redux/chat-reducer"
import { AppStateType } from "../../redux/redux-store"
import { selectWSStatus } from "../../redux/chat-selectors"

const ChatPage: FC = () =>
    <div>
        <Chat/>
    </div>

const Chat: FC = () => {
    const dispatch = useDispatch()
    const status = useSelector(selectWSStatus)

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            { status === 'error' && <div><p>Some error occured. Please refresh the page</p></div> }
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            setIsAutoScroll(true)
        } else {
            setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (messagesAnchorRef.current && isAutoScroll) {
            messagesAnchorRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isAutoScroll])

    return (
        <div style={ { height: '400px', overflowY: 'auto' } } onScroll={ scrollHandler }>
            { messages.map((m, idx) => <Message key={ m.id } message={ m }/>) }
            <div ref={ messagesAnchorRef }></div>
        </div>
    )
}


const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {

    return (
        <div>
            <img src={ message.photo } style={ { width: '30px' } } alt={ message.userName }/>
            <b>{ message.userName }</b>
            <br/>
            <p>{ message.message }</p>
            <hr/>
        </div>
    )
})

const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector(selectWSStatus)

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
            <button disabled={ status !== 'ready' } onClick={ sendMessageHandler }>Send</button>
        </div>
    )
}


export default ChatPage