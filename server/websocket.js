const ws = require('ws')

const wss = new ws.Server(
    {
        port: 5000
    },
    () => console.log(`Server started on 5000`)
)

const data = {
    event: 'message/connection',
    id: 001,
    date: '05.06.2021',
    username: 'Vanya',
    message: 'Like'
}

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'data':
                broadcastMessage(message)
                break
            case 'connection':
                broadcastMessage(message)
                break
        }
    })
})

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}
