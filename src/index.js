import Whiteboard from './whiteboard'
import User from './user'
import Vue from 'vue'
import { runInteractjs } from './interactjs'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { runWebsocket } from './websocket-client'

// html上の関数と紐づけ
window.createCard = createCard
window.changeCardColor = changeCardColor
window.importCards = importCards
window.exportCards = exportCards
window.deleteCard = deleteCard
// 画面遷移前に確認ダイアログを表示
window.onbeforeunload = () => { return "" };

window.changeText = changeText


export const whiteboard = new Whiteboard
const user = new User
let vue
(function () {
    // インポートボタンにイベントをセット→ファイルが読み込まれたら発火
    document.forms.formTagForImport.importFileButton.addEventListener("change", importCards, false)

    // vue設定
    vue = new Vue({
        el: '#app',
        data: {
            cards: whiteboard.cards
        }
    })

    // interactjs起動
    runInteractjs(whiteboard)
    runWebsocket()
}());

// カード作成関数
function createCard() {
    user.createCard(whiteboard)
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

// カードカラー変更関数
function changeCardColor(clieckedButton) {
    // クリックされたカードIDを渡す
    user.changeCardColor(clieckedButton.parentNode.id, whiteboard)
}

// カード削除関数
function deleteCard(clieckedButton) {
    // クリックされたカードIDを渡す
    user.deleteCard(clieckedButton.parentNode.id, whiteboard)
}

function changeText(changedTextarea){
    user.changeText(changedTextarea, whiteboard)
}