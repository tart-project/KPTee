export default class WebsocketClient {
    constructor(fn) {
        this.websocket = new WebSocket(`ws://${window.location.hostname}:5001`);
        // 他のクライアントから受信した場合に発火
        this.websocket.addEventListener('message', (e) => {
            fn(JSON.parse(e.data))
        });
    }

    sendInfo(sendInfo) {
        if (sendInfo != null) {
            this.websocket.send(JSON.stringify(sendInfo));
        }
    }
}