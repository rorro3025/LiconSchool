import { useState, useRef, useEffect } from "react";

export default function SocketNative() {

    const connection = useRef<null | WebSocket>(null)
    const [messages, setMessages] = useState<string[]>([])
    const [text, setText] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (connection.current === null) return alert('no conection')
        setMessages([...messages, `RHernandez: ${text}`])
    }

    const initializeSocket = () => {
        if (connection.current === null) {
            const socket = new WebSocket('ws://localhost:8000')
            socket.onopen = () => {
                console.log('client connected')
                socket.send('RHernandez')
                setMessages([...messages, 'RHernandez has connected'])
            }
            socket.onmessage = (event) => {
                console.log('from server:', event.data)
                console.log('message e: ', messages.length)
                const temp = [...messages]
                temp.push(`Server: ${event.data}`)
                setMessages(temp)
            }

            socket.onclose = () => {
                setMessages([...messages, 'RHernandez has desconnected'])
            }

            socket.onerror = (error) => {
                console.log(error)
            }
            connection.current = socket
        }
    }

    useEffect(() => {
        initializeSocket()
    })

    return (
        <div style={{ width: '400px', margin: '10px', padding: '10px', height: '600px', overflow: 'auto', border: '1px solid red' }}>
            <h1>Socket Native</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((message, i) => (
                    <li key={i}>{message}</li>
                ))}
            </ul>
        </div>
    )
}
