export default class RunWebsocket {
    constructor(whiteboard) {
        this.stockCards = []
        this.websocket = new WebSocket('ws://127.0.0.1:5001');
        this.websocket.addEventListener('open', function (e) {
            // websocketに疎通された時
            console.log('Socket connect');
        });

        this.websocket.addEventListener('message', function (e) {
            // 受信した時
            const receivedCard = JSON.parse(e.data)
            const index = whiteboard.cards.findIndex(({ id }) => id === receivedCard[1].id)

            if (receivedCard[0] == "create") {
                whiteboard.createCard(receivedCard[1])
            } else if (receivedCard[0] == "update") {
                whiteboard.updateCard(index, receivedCard[1])
            } else if (receivedCard[0] == "delete") {
                whiteboard.deleteCard(index)
            } else if (receivedCard[0] == "inisialLoad") {
                for (const card of receivedCard[1]) {
                    whiteboard.createCard(card)
                }
            }
        });
    }

    sendCreatedInfo(target) {
        const sendInfo = ["create", target]
        this.websocket.send(JSON.stringify(sendInfo));
    }
    sendUpdatedInfo(target) {
        const sendInfo = ["update", target]
        this.websocket.send(JSON.stringify(sendInfo));
    }
    sendDeletedInfo(target) {
        const sendInfo = ["delete", target]
        this.websocket.send(JSON.stringify(sendInfo));
    }
}