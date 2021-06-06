const ws = require('ws')

const wss = new ws.Server(
    {
        port: 5000
    },
    () => console.log(`Server started on 5000`)
)

wss.on('connection', function connection(ws) {
    ws.on('message', function (data) {
        data = JSON.parse(data)

        switch (data.event) {
            case 'data':
                broadcastMessage(data)
                break
            case 'connection':
                broadcastMessage(data)
                break
        }
    })
})

function broadcastMessage(data) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(data))
    })
}
