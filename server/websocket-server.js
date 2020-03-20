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

        // クライアントからメッセージを受け取った場合
        ws.on('message', (message) => {
            const card = JSON.parse(message)

            let index = cards.findIndex(({ id }) => id === card[1].id)

            // cardsに最新情報を送信
            if (card[0] == "create") {
                cards.push(card[1])

            } else if (card[0] == "update") {
                cards.splice(index, 1)
                cards.splice(index, 0, card[1])

            } else if (card[0] == "delete") {
                cards.splice(index, 1)

            } else if (card[0] == "addCardToGarbegeCan") {
                garbageCanCards.push(card[1])

            } else if (card[0] == "deleteCardFromGarbegeCan") {
                garbageCanCards.splice(garbageCanCards.length-1, 1)
            }

            // 送信者以外にデータを送信
            websocketServer.clients.forEach(client => {

                if (client !== ws)
                    client.send(JSON.stringify(card));
            });
        });

        // クライアントが通信を切断した場合
        ws.on('close', () => {
            
            if (websocketServer.clients.size == 0) {
                // 接続者が0人だった場合→初期化
                cards.splice(0, cards.length)
            }
        });
    });
}