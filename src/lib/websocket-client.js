import _ from 'lodash'

export default class WebsocketClient {
    constructor(whiteboard, garbageCan, synchronizer) {
        this.websocket = new WebSocket(`ws://${window.location.hostname}:5001`);
        // 他のクライアントから受信した場合に発火
        this.websocket.addEventListener('message', (e) => {
            synchronizer.reflectReceivedInfo(JSON.parse(e.data), whiteboard, garbageCan)
        });
    }

    sendInfo(sendInfo) {
        if (sendInfo != null) {
            this.websocket.send(JSON.stringify(sendInfo));
        }
    }
}