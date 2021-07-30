const subscribers = {
    'messages-recieved': [] as MessagedReceivedSubsciberType[],
    'status-changed': [] as StatusChangedSubsciberType[]
}
let ws: WebSocket | null = null

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-recieved'].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
    console.error('REFRESH PAGE')
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
}

const cleanUp = (ws: WebSocket) => {
    ws.removeEventListener('close', closeHandler)
    ws.removeEventListener('message', messageHandler)
    ws.removeEventListener('open', openHandler)
    ws.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    if (ws) {
        cleanUp(ws)
        ws.close()
    }
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-recieved'] = []
        subscribers['status-changed'] = []
        if (ws) {
            cleanUp(ws)
            ws.close()
        }
    },
    subscribe(eventName: EventsNamestype, callback: MessagedReceivedSubsciberType | StatusChangedSubsciberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)

        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamestype, callback: MessagedReceivedSubsciberType | StatusChangedSubsciberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        if (ws) ws.send(message)
    }
}

type MessagedReceivedSubsciberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubsciberType = (status: StatusType) => void

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type EventsNamestype = 'messages-recieved' | 'status-changed'

export type StatusType = 'pending' | 'ready' | 'error'