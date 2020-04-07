exports.run = () => {

    const server = require('ws').Server;
    const websocketServer = new server({ port: 5001 });
    const originCards = []
    const originGarbageCanCards = []

    // on()はイベントに対する処理を設定できる関数
    websocketServer.on('connection', (ws) => {

        // 初期ロード時最新のホワイトボード情報反映
        if (originCards.length > 0) {
            const sendInfo = { type: "inisialLoad", cardsInfo: originCards, garbageCanCardsInfo: originGarbageCanCards}

            // 送信者に送信
            ws.send(JSON.stringify(sendInfo))
        }

        // クライアントからメッセージを受け取ったに発火
        ws.on('message', (message) => {
            const receivedInfo = JSON.parse(message)
            const index = originCards.findIndex(({ id }) => id === receivedInfo.cardInfo.id)

            // cardsに最新情報を送信
            if (receivedInfo.type == "create") {
                originCards.push(receivedInfo.cardInfo)

            } else if (receivedInfo.type == "update") {
                originCards.splice(index, 1, receivedInfo.cardInfo)

            } else if (receivedInfo.type == "delete") {
                originCards.splice(index, 1)

            } else if (receivedInfo.type == "throwAway") {
                originGarbageCanCards.push(receivedInfo.cardInfo)

            } else if (receivedInfo.type == "takeOut") {
                originGarbageCanCards.pop()
            }

            // 送信者以外のクライアントにデータを送信
            websocketServer.clients.forEach(client => {

                if (client !== ws)
                    client.send(JSON.stringify(receivedInfo));
            });
        });
    });
}