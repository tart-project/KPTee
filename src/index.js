import Whiteboard from './whiteboard'
import User from './user'
import Vue from 'vue'
import { runInteractjs } from './interactjs'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RunWebsocket from './websocket-client'

// html上の関数と紐づけ
window.createCard = createCard
window.changeCardColor = changeCardColor
window.importCards = importCards
window.exportCards = exportCards
window.deleteCard = deleteCard
// 画面遷移前に確認ダイアログを表示
window.onbeforeunload = () => { return "" };

const whiteboard = new Whiteboard()
const user = new User()
const websocket = new RunWebsocket(whiteboard)
let vue
(function () {
    // インポートボタンにイベントをセット→ファイルが読み込まれたら発火
    document.forms.formTagForImport.importFileButton.addEventListener("change", importCards, false)

    // vue設定
    vue = new Vue({
        el: '#app',
        data: {
            cards: whiteboard.cards
        },
        methods:{
            changeText(event){
                user.changeText(event.target, whiteboard, websocket)
            }
        },
　// ２つに格納wuochi→差分を見る
    })

    // interactjs起動
    runInteractjs(whiteboard, user, websocket)

    // websocket起動
    //runWebsocket(whiteboard)
}());

// カード作成関数
function createCard() {
    user.createCard(whiteboard, websocket)
}

// カードカラー変更関数
function changeCardColor(clieckedButton) {
    // クリックされたカードIDを渡す
    user.changeCardColor(clieckedButton.parentNode.id, whiteboard, websocket)
}

// カード削除関数
function deleteCard(clieckedButton) {
    // クリックされたカードIDを渡す
    user.deleteCard(clieckedButton.parentNode.id, whiteboard, websocket)
}

// インポート関数
function importCards(e) {
    if (e) {
        // ファイルが読み込まれた場合
        whiteboard.importCards(e)
    }
}

// エクスポート関数
function exportCards(clieckedButton) {
    whiteboard.downloadFile(clieckedButton)
}