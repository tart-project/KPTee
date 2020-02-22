var server = require('ws').Server;
var websocketServer = new server({ port: 5001 });

const cards = []

// on()はイベントに対する処理を設定できる関数
websocketServer.on('connection', function (ws) {

    if (cards.length > 0) {
        const sendInfo = ["inisialLoad", cards]
        ws.send(JSON.stringify(sendInfo))
    }

    ws.on('message', function (message) {
        const card = JSON.parse(message)
        const index = cards.findIndex(({ id }) => id === card[1].id)

        if (card[0] == "create") {
            cards.push(card[1])
        } else if (card[0] == "update") {
            cards.splice(index, 1)
            cards.splice(index, 0, card[1])
        } else if (card[0] == "delete") {
            cards.splice(index, 1)
        }

        websocketServer.clients.forEach(client => {
            if (client !== ws)
                client.send(JSON.stringify(card));
        });
    });

    ws.on('close', function () {
        console.log('I lost a client');
        // TODO? 全員接続が切れたらcardsを初期化 .clientsで取れそう
    });
});