import React, { useEffect, useRef } from "react";

function getRandomNumber(min, max) {
    return Math.floor(min - 0.5 + Math.random() * (max - min + 1));
}

const MainPage = () => {
    const socket = useRef();

    useEffect(() => {
        socket.current = new WebSocket("ws://localhost:5000");
    }, []);

    const start = () => {
        for (let i = 1; i < 21; i++) {
            let firstPoint = getRandomNumber(3000, 15000);

            setTimeout(() => {
                socket.current.send(
                    JSON.stringify({
                        identifier: i,
                        timing_point: "Start",
                        time: firstPoint,
                        event: "message",
                    })
                );

                let secondPoint = getRandomNumber(5000, 10000);
                setTimeout(() => {
                    socket.current.send(
                        JSON.stringify({
                            identifier: i,
                            timing_point: "Finish",
                            time: secondPoint,
                            event: "message",
                        })
                    );
                }, secondPoint);
            }, firstPoint);
        }
    };

    return (
        <div className="center">
            <div onClick={start}>START</div>
        </div>
    );
};

export default MainPage;
