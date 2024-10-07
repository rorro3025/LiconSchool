import { useState, useEffect, useRef, useCallback } from "react"

interface Props {
    name: string
}

export default function Chat({ name }: Props) {
    const [message, setMessage] = useState('message')
    const [response, setResponse] = useState<string[]>([])
    const socket = useRef<WebSocket | null>(null)
    const URL = 'wss://yfcdv5pwkl.execute-api.us-east-1.amazonaws.com/cat/'

    const handleSendOne = useCallback(() => {
        if (socket.current) {
            const message = prompt('Enter your name')
            socket.current.send(JSON.stringify({ action: 'sendMessageWS', body: message }))
        }
    }, [])

    const onSocketOpen = useCallback(() => {
        if (socket.current) {
            const name = prompt('Enter your name')
            socket.current.send(JSON.stringify({ action: 'sendMessageWS', body: name }))
        }
    }, [])

    const onSocketMessage = useCallback((dataStr:any)=>{
        const data = JSON.parse(dataStr)
        setResponse(prev=>[...prev, data.body])
    },[])

    const onConnect = useCallback(() => {
        if (socket.current?.readyState !== WebSocket.OPEN) {
            socket.current = new WebSocket(URL)
            socket.current.onopen = onSocketOpen
            socket.current.onclose = onSocketOpen
            socket.current.onmessage = onSocketMessage
        }
    }, [])
    
    useEffect(() => {
        return () => {
            if (socket.current) {
                socket.current.close()
            }
        }
    }, [])

    return (
        <div>
            <h1>Chat</h1>
            {message}
            <button onClick={handleSendOne}>send </button>
            <div>
                responses: {response.map((i, ix) => (<div key={ix}>{i}</div>))}
            </div>
        </div>
    )
}