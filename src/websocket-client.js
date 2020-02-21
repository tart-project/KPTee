export default class RunWebsocket {
    constructor(whiteboard) {
        this.websocket = new WebSocket('ws://127.0.0.1:5001');
        this.websocket.addEventListener('open', function (e) {
            console.log('Socket connect');
        });
        
        this.websocket.addEventListener('message', function (e) {
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

    ceateInfo(target) {
        const sendInfo = [target, "create"]
        this.websocket.send(JSON.stringify(sendInfo));
    }
    updateInfo(target) {
        const sendInfo = [target, "update"]
        this.websocket.send(JSON.stringify(sendInfo));
    }
    deleteInfo(target) {
        const sendInfo = [target, "delete"]
        this.websocket.send(JSON.stringify(sendInfo));
    }   
}



/*
export function runWebsocket(whiteboard) {

    websocket = new WebSocket('ws://127.0.0.1:5001');

    websocket.addEventListener('open', function (e) {
        console.log('Socket connect');
    });

    // サーバーからデータを受け取る
    websocket.addEventListener('message', function (e) {
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

export function websocketCeateInfo(target) {
    const sendInfo = [target, "create"]
    websocket.send(JSON.stringify(sendInfo));
}

export function websocketUpdateInfo(target) {
    const sendInfo = [target, "update"]
    websocket.send(JSON.stringify(sendInfo));
}

export function websocketDeleteInfo(target) {
    const sendInfo = [target, "delete"]
    websocket.send(JSON.stringify(sendInfo));
}
*/