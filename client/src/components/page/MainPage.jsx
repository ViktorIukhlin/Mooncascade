import React, { useEffect, useRef, useState } from 'react'
import Table from '../organisms/Table'

const MainPage = () => {
    const [data, setData] = useState([])
    const socket = useRef()
    const [connected, setConnected] = useState(false)

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
        }
        socket.current.onmessage = event => {
            const message = JSON.parse(event.data)
            setData(state => [message, ...state])
        }
        socket.current.onclose = () => {
            console.log('Socket close')
        }
        socket.current.onerror = () => {
            console.log('Socket an error has occurred')
        }
    }

    useEffect(() => {
        connect()
    }, [])

    console.log('data', data)

    return (
        <>
            <div className="main-page">
                <div className="main-page__header"></div>
                <div className="main-page__body">
                    <div className="main-page__side-bar"></div>
                    <div className="main-page__box-table">
                        <div className="main-page__top-box">
                            <div className="main-page__page-name">Пользователи</div>
                        </div>
                        <Table data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage
