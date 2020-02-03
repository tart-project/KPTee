import Whiteboard from './whiteboard'
import User from './user'
import Vue from 'vue'

// html上の関数と紐づけ
window.createCard = createCard
window.changeCardColor = changeCardColor
window.importCards = importCards
window.exportCards = exportCards
window.deleteCard = deleteCard
window.onbeforeunload = () => { return "" };

const whiteboard = new Whiteboard
const user = new User
// グローバル変数設定
let vue

// インポートボタンにイベントをセット
(function () {
    const importLocation = document.forms.formTagForImport;
    // ファイルが読み込まれたら発火
    importLocation.importFileButton.addEventListener("change", importCards, false)

    vue = new Vue({
        el: '#app',
        data: {
            cardList: whiteboard.cardList
        },
        methods: {
            testtest: function () {
                console.log(this.$el)
            }
        }
    })
}());


// カード作成関数
function createCard() {
    user.createCard(whiteboard)
}

// インポート関数
function importCards(e) {
    whiteboard.importCards(e)
}

// エクスポート関数
function exportCards() {
    whiteboard.exportCards()
}

// カードカラー変更関数
function changeCardColor(clieckedButton) {

    // クリックされたカードIDを渡す
    user.changeColor(clieckedButton.parentNode.id)
}

// カード削除関数
function deleteCard(clieckedButton) {

    // クリックされたカードIDを渡す
    user.deleteCard(clieckedButton.parentNode.id, whiteboard)
}