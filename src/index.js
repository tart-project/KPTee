import Whiteboard from './whiteboard'
import User from './user'
import Vue from 'vue'
import { runInteractjs } from './convenientTools'

// html上の関数と紐づけ
window.createCard = createCard
window.changeCardColor = changeCardColor
window.importCards = importCards
window.exportCards = exportCards
window.deleteCard = deleteCard
// 画面遷移前に確認ダイアログを表示
window.onbeforeunload = () => { return "" };

const whiteboard = new Whiteboard
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

}());

// カード作成関数
function createCard() {
    user.createCard(whiteboard)
    console.log(whiteboard.cards)
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