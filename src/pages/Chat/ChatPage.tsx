import React, { FC, useEffect, useState } from "react"

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: FC = () =>
    <div>
        <Chat/>
    </div>

const Chat: FC = () => {
    const [wsChannel, setWSChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            if (ws) {
                ws.removeEventListener('close', closeHandler)
                ws.close()
            }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWSChannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={ wsChannel }/>
            <AddMessageForm wsChannel={ wsChannel }/>
        </div>
    )
}

const Messages: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages(prevMessages => [...prevMessages, ...newMessages])
        }

        if(wsChannel) wsChannel.addEventListener('message', messageHandler)

        return () => {
            if(wsChannel) wsChannel.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

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

const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        }

        if(wsChannel) wsChannel.addEventListener('open', openHandler)

        return () => {
            if(wsChannel) wsChannel.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (message) {
            if(wsChannel) wsChannel.send(message)
            setMessage('')
        }
    }

    return (
        <div>
            <div>
                <textarea onChange={ e => setMessage(e.currentTarget.value) } value={ message }></textarea>
            </div>
            <button disabled={ wsChannel === null && readyStatus !== 'ready' } onClick={ sendMessage }>Send</button>
        </div>
    )
}


export default ChatPage