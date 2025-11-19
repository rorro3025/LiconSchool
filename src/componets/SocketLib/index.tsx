import { useState, useRef, useEffect } from "react";
import { socket } from './config'

export default function SocketNative() {

    const [messages, setMessages] = useState<string[]>([])
    const [text, setText] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        socket.emit('message', text)
        setMessages([...messages, `RHernandez: ${text}`])
    }


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        return () => { socket.off('message') }
    }, [messages])


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
