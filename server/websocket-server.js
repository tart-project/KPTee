exports.run = () => {

    const server = require('ws').Server;
    const websocketServer = new server({ port: 5001 });
    const cards = []
    const garbageCanCards = []

    // on()はイベントに対する処理を設定できる関数
    websocketServer.on('connection', (ws) => {

        // 初期ロード時最新のホワイトボード情報反映
        if (cards.length > 0) {
            const sendInfo = { type: "inisialLoad", card: cards, index: null }

            // 送信者に送信
            ws.send(JSON.stringify(sendInfo))
        }

        // クライアントからメッセージを受け取ったに発火
        ws.on('message', (message) => {
            const receivedInfo = JSON.parse(message)
            const index = cards.findIndex(({ id }) => id === receivedInfo.card.id)

            // cardsに最新情報を送信
            if (receivedInfo.type == "create") {
                cards.push(receivedInfo.card)

            } else if (receivedInfo.type == "update") {
                cards.splice(index, 1, receivedInfo.card)

            } else if (receivedInfo.type == "delete") {
                cards.splice(index, 1)

            } else if (receivedInfo.type == "addCardToGarbegeCan") {
                garbageCanCards.push(receivedInfo.card)

            } else if (receivedInfo.type == "deleteCardFromGarbegeCan") {
                garbageCanCards.pop()
            }

            // 送信者以外のクライアントにデータを送信
            websocketServer.clients.forEach(client => {

                if (client !== ws)
                    client.send(JSON.stringify(receivedInfo));
            });
        });

        // クライアントが通信を切断した場合に発火
        ws.on('close', () => {

            if (websocketServer.clients.size == 0) {
                // 接続者が0人だった場合→初期化
                cards.splice(0, cards.length)
            }
        });
    });
}