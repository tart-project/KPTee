export default class RunWebsocket {
    constructor(whiteboard) {
        this.websocket = new WebSocket('ws://127.0.0.1:5001');
        this.websocket.addEventListener('open', function (e) {
            // websocketに疎通された時
            console.log('Socket connect');
        });

        this.websocket.addEventListener('message', function (e) {
            // 受信した時
            const card = JSON.parse(e.data)
            const index = whiteboard.cards.findIndex(({ id }) => id === card[0].id)

            if (card[1] == "create") {
                whiteboard.createCard(card[0])
            } else if (card[1] == "update") {
                whiteboard.updateCard(index, card[0])
            } else if (card[1] == "delete") {
                whiteboard.deleteCard(index)
            }
        });

    }

    sendCreatedInfo(target) {
        const sendInfo = [target, "create"]
        this.websocket.send(JSON.stringify(sendInfo));
    }
    sendUpdatedInfo(target) {
        const sendInfo = [target, "update"]
        this.websocket.send(JSON.stringify(sendInfo));
    }
    sendDeletedInfo(target) {
        const sendInfo = [target, "delete"]
        this.websocket.send(JSON.stringify(sendInfo));
    }
}