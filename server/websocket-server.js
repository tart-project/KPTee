exports.run = () => {

    const server = require('ws').Server;
    const websocketServer = new server({ port: 5001 });
    const originCardsInfo = []
    const originGarbageCanCardsInfo = []

    // on()はイベントに対する処理を設定できる関数
    websocketServer.on('connection', (ws) => {

        // 初期ロード時最新のホワイトボード情報反映
        if (originCardsInfo.length > 0) {
            const sendInfo = { type: "initialLoad", cardsInfo: originCardsInfo, garbageCanCardsInfo: originGarbageCanCardsInfo}

            // 送信者に送信
            ws.send(JSON.stringify(sendInfo))
        }

        // クライアントからメッセージを受け取ったに発火
        ws.on('message', (message) => {
            const receivedInfo = JSON.parse(message)
            const index = originCardsInfo.findIndex(({ id }) => id === receivedInfo.cardInfo.id)

            // cardsに最新情報を送信
            if (receivedInfo.type == "create") {
                originCardsInfo.push(receivedInfo.cardInfo)

            } else if (receivedInfo.type == "update") {
                originCardsInfo.splice(index, 1, receivedInfo.cardInfo)

            } else if (receivedInfo.type == "throwAway") {
                originCardsInfo.splice(index, 1)
                originGarbageCanCardsInfo.push(receivedInfo.cardInfo)

            } else if (receivedInfo.type == "takeOut") {
                originCardsInfo.push(originGarbageCanCardsInfo.pop())
            }

            // 送信者以外のクライアントにデータを送信
            websocketServer.clients.forEach(client => {

                if (client !== ws)
                    client.send(JSON.stringify(receivedInfo));
            });
        });
    });
}