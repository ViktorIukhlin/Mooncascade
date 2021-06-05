import React, { useEffect, useRef, useState } from 'react'

const MainPage = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const socket = useRef()
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState('')

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            // const message = {
            //     event: 'connection',
            //     username,
            //     id: Date.now()
            // }
            // socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = event => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }

    useEffect(() => {
        connect()
    }, [])

    console.log('messages', messages)

    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text" />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess => (
                        <div key={mess.id}>
                            {mess.identifier}:{mess.time}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainPage
