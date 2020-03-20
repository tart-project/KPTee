exports.run = () => {

    const server = require('ws').Server;
    const websocketServer = new server({ port: 5001 });
    const cards = []
    const garbageCanCards = []

    // on()はイベントに対する処理を設定できる関数
    websocketServer.on('connection', (ws) => {

        // 初期ロード時最新のホワイトボード情報反映
        if (cards.length > 0) {
            const sendInfo = ["inisialLoad", cards]
            // 送信者に送信
            ws.send(JSON.stringify(sendInfo))
        }

        // クライアントからメッセージを受け取ったに発火
        ws.on('message', (message) => {

            const receivedType = JSON.parse(message)[0]
            const receivedCard = JSON.parse(message)[1]
            const card = JSON.parse(message)

            let index = cards.findIndex(({ id }) => id === receivedCard.id)

            // cardsに最新情報を送信
            if (receivedType == "create") {
                cards.push(receivedCard)

            } else if (receivedType == "update") {
                cards.splice(index, 1)
                cards.splice(index, 0, receivedCard)

            } else if (receivedType == "delete") {
                cards.splice(index, 1)

            } else if (receivedType == "addCardToGarbegeCan") {
                garbageCanCards.push(receivedCard)

            } else if (receivedType == "deleteCardFromGarbegeCan") {
                garbageCanCards.pop()
            }

            // 送信者以外のクライアントにデータを送信
            websocketServer.clients.forEach(client => {

                if (client !== ws)
                    client.send(JSON.stringify(card));
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