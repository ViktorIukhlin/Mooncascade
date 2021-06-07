import React, { useEffect, useRef, useState } from 'react'
import listOfAthletes from '../../etc/data/listOfAthletes'
import Table from '../organisms/Table'

const MainPage = () => {
    const [data, setData] = useState([])
    const [topList, setTopList] = useState([])
    const [connected, setConnected] = useState(false)
    const [timeClose, setTimeClose] = useState(null)
    const [timeOpen, setTimeOpen] = useState('')
    const socket = useRef()

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            setTimeOpen(new Date().toLocaleString().slice(12))
            console.log('Socket start')
        }

        socket.current.onmessage = event => {
            const athlete = JSON.parse(event.data)

            if (athlete.timing_point === 'Finish') {
                setTopList(state => {
                    let list = [
                        ...state,
                        {
                            ...athlete,
                            finish_time: Number(athlete.time / 1000).toFixed(2)
                        }
                    ]

                    return list.sort((a, b) => {
                        return a.finish_time - b.finish_time
                    })
                })

                setData(state => {
                    let newArr = []
                    if (state.some(i => i.identifier === athlete.identifier)) {
                        newArr = state.map(item => {
                            if (item.identifier === athlete.identifier) {
                                return { ...item, finish_time: athlete.time }
                            } else {
                                return item
                            }
                        })
                    } else {
                        newArr = [...state, { identifier: athlete.identifier, start_time: 0, finish_time: athlete.time }]
                    }

                    return newArr.sort((a, b) => {
                        a = a.finish_time ? a.finish_time + 100000 : a.start_time
                        b = b.finish_time ? b.finish_time + 100000 : b.start_time
                        return b - a
                    })
                })
            } else {
                setData(state => {
                    let newArr = [{ identifier: athlete.identifier, start_time: athlete.time, finish_time: 0 }, ...state]

                    return newArr.sort((a, b) => {
                        a = a.finish_time ? a.finish_time + 100000 : a.start_time
                        b = b.finish_time ? b.finish_time + 100000 : b.start_time
                        return b - a
                    })
                })
            }
        }
        socket.current.onclose = () => {
            setConnected(false)
            setTimeClose(new Date().toLocaleString().slice(12))
            console.log('Socket close')
        }
        socket.current.onerror = () => {
            console.log('Socket an error has occurred')
        }
    }

    const getNameOfAthlete = (identifier, Id) => {
        const athlete = listOfAthletes.find(item => item.id === identifier)

        return identifier + ' ' + athlete.first_name + ' ' + athlete.surname
    }

    const clearAllData = () => {
        setData([])
        setTopList([])
        setTimeClose(null)
    }

    useEffect(() => {
        connect()
    }, [])

    useEffect(() => {
        const listener = () => {
            if (document.visibilityState === 'visible') {
                !connected && connect()
            } else {
                socket.current.close()
            }
        }

        document.addEventListener('visibilitychange', listener)

        return () => document.removeEventListener('visibilitychange', listener)
    }, [])

    return (
        <>
            <div className="main-page">
                <div className="main-page__header">
                    <div className="main-page__header-text">
                        <div className="main-page__header-title">Running competition</div>
                        <div className="main-page__header-warning">
                            {timeClose &&
                                `WARNING! The connection was disconnected at ${timeClose} re-established at ${timeOpen}! Data loss possible!`}
                        </div>
                    </div>
                    <div className="main-page__header-actions">
                        <div className="main-page__header-clear" onClick={clearAllData}>
                            clear page
                        </div>
                        <div className={connected ? 'main-page__header-status online' : 'main-page__header-status'}>
                            {connected ? 'online' : 'offline'}
                        </div>
                    </div>
                </div>
                <div className="main-page__body">
                    <div className="main-page__side-bar">
                        <div className="main-page__message-box">
                            {topList.map(({ identifier, finish_time }, Id) => (
                                <div
                                    key={Id}
                                    className={
                                        Id === topList.length - 1
                                            ? `main-page__message-card animate ${'place_' + (Id + 1)}`
                                            : `main-page__message-card ${'place_' + (Id + 1)}`
                                    }
                                >
                                    <div>
                                        <span style={{ color: '#C4C4C4' }}>{Id + 1}</span>
                                        &nbsp;&nbsp;
                                        {getNameOfAthlete(identifier, Id)}
                                    </div>
                                    {finish_time}s
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="main-page__box-table">
                        <Table data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage
