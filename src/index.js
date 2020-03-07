import Whiteboard from './whiteboard'
import User from './user'
import Vue from 'vue'
import { runInteractjs } from './interactjs'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ColorsPicker from './color-picker'

const whiteboard = new Whiteboard()
const user = new User()
const colorPicker = new ColorsPicker()

// html上の関数と紐づけ
window.createCard = createCard
window.importCards = importCards
window.exportCards = exportCards
window.deleteCard = deleteCard
window.showOrHide = showOrHide
window.changeColor = changeColor
// 画面遷移前に確認ダイアログを表示
window.onbeforeunload = () => { return "" };
// カラーピッカー 以外をクリックした場合にカラーピッカー表示をOFFにする
window.addEventListener('click', function (e) { colorPicker.checkClickedPoint(e, whiteboard) });

(function () {
    // インポートボタンにイベントをセット→ファイルが読み込まれたら発火
    document.forms.formTagForImport.importFileButton.addEventListener("change", importCards, false)

    new Vue({
        el: '#app',
        data: {
            cards: whiteboard.cards,
            colors: colorPicker.colors
        }
    })

    // interactjs起動
    runInteractjs(whiteboard)
}());

// カード作成関数
function createCard() {
    user.createCard(whiteboard)
}

function importCards(e) {
    if (e.target) {
        // ファイルが読み込まれた場合
        whiteboard.importCards(e)
    }
}

function exportCards(clieckedButton) {
    whiteboard.downloadFile(clieckedButton)
}

function deleteCard(clieckedButton) {
    user.deleteCard(clieckedButton.parentNode.id, whiteboard)
}

function changeColor(e) {
    user.changeColor(e, whiteboard)
}

function showOrHide(e) {
    colorPicker.showOrHide(e, whiteboard)
}