import { whiteboard } from './index'

var sock

export function test(){ 

    sock = new WebSocket('ws://127.0.0.1:5001');

sock.addEventListener('open',function(e){
    console.log('Socket 接続成功');
});


// サーバーからデータを受け取る
sock.addEventListener('message',function(e){
    whiteboard.cards= JSON.parse(e.data)
});


}
// 接続




export function aa(sendInfo){
    sock.send(JSON.stringify(sendInfo));
}