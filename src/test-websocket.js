import { whiteboard } from './index'

var sock

export function test() {

    sock = new WebSocket('ws://127.0.0.1:5001');

    sock.addEventListener('open', function (e) {
        console.log('Socket 接続成功');
    });


    // サーバーからデータを受け取る
    sock.addEventListener('message', function (e) {
        const card = JSON.parse(e.data)[1]
        if (JSON.parse(e.data)[0] == 0) {

            whiteboard.cards.push(JSON.parse(e.data)[1])
            console.log(whiteboard)
        }
        else if (JSON.parse(e.data)[0] == 1) {

            console.log(JSON.parse(e.data))
            var a= whiteboard.cards.findIndex(({id}) => id === card.id)
            whiteboard.cards[a].backgroundColor= card.backgroundColor
            console.log(whiteboard)
        }
    });
}
// 接続




export function sendCard(sendCard) {
    const sendInfo = [0, sendCard]
    sock.send(JSON.stringify(sendInfo));
}

export function sendColor(target) {
    const sendInfo = [1, target]
    sock.send(JSON.stringify(sendInfo));
}