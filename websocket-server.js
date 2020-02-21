var server = require('ws').Server;
var websocketServer = new server({ port: 5001 });

const cards = []

// on()はイベントに対する処理を設定できる関数
websocketServer.on('connection', function (ws) {

    // TODO 初期リロード
    //  ws.send("送信してきたクライアントのみに返す(cardsをwhiteboardに反映)");

    ws.on('message', function (message) {
        const card = JSON.parse(message)
        const index = cards.findIndex(({ id }) => id === card[0].id)

        if (card[1] == "create") {
                cards.push(card[0])
        } else if (card[1] == "update") {
                cards.splice(index, 1)
                cards.push(card[0])
            } else if (card[1] == "delete") {
            cards.splice(index, 1)
        }

        websocketServer.clients.forEach(client => {
            if (client !== ws)
                client.send(JSON.stringify(card));
        });
    });

    ws.on('close', function () {
        console.log('I lost a client');
    });
});