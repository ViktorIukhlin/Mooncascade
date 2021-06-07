import React, { useEffect, useRef, useState } from 'react'

function getRandomNumber(min, max) {
    return Math.floor((+min - 0.5 + Math.random() * (+max - +min + 1)) * 1000)
}

const MainPage = () => {
    const [settings, setSettings] = useState({
        start_min: 3,
        start_max: 15,
        finish_min: 5,
        finish_max: 10,
        number_athletes: 20
    })
    const [sending, setSending] = useState(0)
    const socket = useRef()

    useEffect(() => {
        connect()
    }, [])

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            console.log('Socket start')
        }

        socket.current.onclose = () => {
            connect()
            console.log('Socket close')
        }
        socket.current.onerror = () => {
            console.log('Socket an error has occurred')
        }
    }

    const changeValues = e => {
        const target = e.target
        const value = target.value
        const name = target.name

        if (value < 1) {
            return setSettings(state => ({ ...state, [name]: '1' }))
        }

        if (value > 100 && name !== 'number_athletes') {
            return setSettings(state => ({ ...state, [name]: '100' }))
        }

        if (name === 'start_min' && +value > settings.start_max) {
            return setSettings(state => ({
                ...state,
                [name]: value,
                start_max: value
            }))
        }
        if (name === 'start_max' && +value < settings.start_min) {
            return setSettings(state => ({
                ...state,
                [name]: value,
                start_min: value
            }))
        }
        if (name === 'finish_min' && +value > settings.finish_max) {
            return setSettings(state => ({
                ...state,
                [name]: value,
                finish_max: value
            }))
        }
        if (name === 'finish_max' && +value < settings.finish_min) {
            return setSettings(state => ({
                ...state,
                [name]: value,
                finish_min: value
            }))
        }

        if (name === 'finish_min' && +value > settings.finish_max) {
            return setSettings(state => ({
                ...state,
                [name]: settings.finish_max
            }))
        }

        if (name === 'number_athletes' && +value > 30) {
            return setSettings(state => ({ ...state, [name]: '30' }))
        }

        setSettings(state => ({ ...state, [name]: value }))
    }

    const sendingData = () => {
        setSending(settings.number_athletes)

        for (let i = 0; i < settings.number_athletes; i++) {
            let firstPoint = getRandomNumber(settings.start_min, settings.start_max)

            setTimeout(() => {
                socket.current.send(
                    JSON.stringify({
                        identifier: i,
                        timing_point: 'Start',
                        time: firstPoint,
                        event: 'data'
                    })
                )

                let secondPoint = getRandomNumber(settings.finish_min, settings.finish_max)
                setTimeout(() => {
                    socket.current.send(
                        JSON.stringify({
                            identifier: i,
                            timing_point: 'Finish',
                            time: secondPoint + firstPoint,
                            event: 'data'
                        })
                    )
                    setSending(state => state - 1)
                }, secondPoint)
            }, firstPoint)
        }
    }

    return (
        <div className="wrapper">
            <div className="modal">
                <h1>Athlete Speed Settings</h1>
                <div className="modal__label">The time it takes athletes to reach the finish corridor</div>
                <div className="modal__input-box">
                    <input
                        className="modal__input"
                        type="number"
                        name="start_min"
                        placeholder="MIN"
                        value={settings.start_min}
                        onChange={changeValues}
                    />
                    &nbsp;&mdash;&nbsp;
                    <input
                        className="modal__input"
                        type="number"
                        name="start_max"
                        placeholder="MAX"
                        value={settings.start_max}
                        onChange={changeValues}
                    />
                    &nbsp;Seconds (1 - 100)
                </div>
                <div className="modal__label">The time it takes to overcome the finish corridor</div>
                <div className="modal__input-box">
                    <input
                        className="modal__input"
                        type="number"
                        name="finish_min"
                        placeholder="MIN"
                        value={settings.finish_min}
                        onChange={changeValues}
                    />
                    &nbsp;&mdash;&nbsp;
                    <input
                        className="modal__input"
                        type="number"
                        name="finish_max"
                        placeholder="MAX"
                        value={settings.finish_max}
                        onChange={changeValues}
                    />
                    &nbsp;Seconds (1 - 100)
                </div>
                <div className="modal__label">Number of running athletes</div>
                <div className="modal__input-box">
                    <input
                        className="modal__input"
                        type="number"
                        name="number_athletes"
                        placeholder="NUMBER"
                        value={settings.number_athletes}
                        onChange={changeValues}
                    />
                    &nbsp;People (1 - 30)
                </div>
                <div className="modal__input-box">
                    {!sending ? (
                        <div className="modal__button" onClick={sendingData}>
                            SEND DUMMY DATA
                        </div>
                    ) : (
                        <div className="modal__button disabled" onClick={sendingData}>
                            Sending in progress... <div className="spinner" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainPage
