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
            const athlete = JSON.parse(event.data)

            if (athlete.timing_point === 'Finish') {
                setData(state => {
                    let newArr = state.map(item => {
                        if (item.identifier === athlete.identifier) {
                            return { ...item, finish_time: athlete.time }
                        } else {
                            return item
                        }
                    })

                    return newArr.sort((a, b) => {
                        a = a.finish_time ? a.finish_time + a.start_time + 100000 : a.start_time
                        b = b.finish_time ? b.finish_time + b.start_time + 100000 : b.start_time
                        return b - a
                    })
                })
            } else {
                setData(state => {
                    let newArr = [{ identifier: athlete.identifier, start_time: athlete.time, finish_time: 0 }, ...state]

                    return newArr.sort((a, b) => {
                        a = a.finish_time ? a.finish_time + a.start_time + 100000 : a.start_time
                        b = b.finish_time ? b.finish_time + b.start_time + 100000 : b.start_time
                        return b - a
                    })
                })
            }
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

    useEffect(() => {
        const listener = () => {
            if (document.visibilityState === 'visible') {
                console.log('ПРИШЕЛ НА САЙТ')
            } else {
                console.log('УШЕЛ С САЙТА')
            }
        }

        document.addEventListener('visibilitychange', listener)

        return () => document.removeEventListener('visibilitychange', listener)
    }, [])

    return (
        <>
            <div className="main-page">
                <div className="main-page__header"></div>
                <div className="main-page__body">
                    <div className="main-page__side-bar"></div>
                    <div className="main-page__box-table">
                        <Table data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage
