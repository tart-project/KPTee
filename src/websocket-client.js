import { whiteboard } from './index'
import Card from './card';

var websocket

export function runWebsocket() {

    websocket = new WebSocket('ws://127.0.0.1:5001');

    websocket.addEventListener('open', function (e) {
        console.log('Socket 接続成功');
    });


    // サーバーからデータを受け取る
    websocket.addEventListener('message', function (e) {
        const card = JSON.parse(e.data)[1]
        if (JSON.parse(e.data)[0] == 0) {

            whiteboard.cards.push(new Card(card))
        }
        else if (JSON.parse(e.data)[0] == 1) {

            var a = whiteboard.cards.findIndex(({ id }) => id === card.id)
            whiteboard.cards[a].backgroundColor = card.backgroundColor
            whiteboard.cards[a].backgroundColor = card.backgroundColor
            whiteboard.cards[a].changeColorButtonBackgroundColor = card.changeColorButtonBackgroundColor
            whiteboard.cards[a].text = card.text
        }
        else if (JSON.parse(e.data)[0] == 2) {
            var a = whiteboard.cards.findIndex(({ id }) => id === card.id)

            whiteboard.cards[a].top = card.top
            whiteboard.cards[a].left = card.left
        }
        else if (JSON.parse(e.data)[0] == 3) {
            var a = whiteboard.cards.findIndex(({ id }) => id === card.id)

            whiteboard.cards[a].width = card.width
            whiteboard.cards[a].height = card.height
        }
        else if (JSON.parse(e.data)[0] == 4) {
            var a = whiteboard.cards.findIndex(({ id }) => id === card.id)

            whiteboard.cards.splice(a, 1)
        }
        else if (JSON.parse(e.data)[0] == 5) {
            var a = whiteboard.cards.findIndex(({ id }) => id === card.id)

            whiteboard.cards[a].text = card.text
        }
    });
}
// 接続


export function sendCard(target) {
    const sendInfo = [0, target]
    websocket.send(JSON.stringify(sendInfo));
}

export function sendColor(target) {
    const sendInfo = [1, target]
    websocket.send(JSON.stringify(sendInfo));
}

export function sendDrag(target) {
    const sendInfo = [2, target]
    websocket.send(JSON.stringify(sendInfo));
}

export function sendResize(target) {
    const sendInfo = [3, target]
    websocket.send(JSON.stringify(sendInfo));
}

export function sendDelete(target) {
    const sendInfo = [4, target]
    websocket.send(JSON.stringify(sendInfo));
}


export function sendText(target) {
    const sendInfo = [5, target]
    websocket.send(JSON.stringify(sendInfo));
}