import Whiteboard from './whiteboard'
import User from './user'
import Vue from 'vue'
import { runInteractjs } from './interactjs'
import GarbageCan from './garbage-can'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ColorPicker from './color-picker'

const whiteboard = new Whiteboard()
const user = new User()
const garbageCan = new GarbageCan()
const colorPicker = new ColorPicker()

// html上の関数と紐づけ
window.createCard = createCard
window.importCards = importCards
window.exportCards = exportCards
window.toggleDisplayColorPicker = toggleDisplayColorPicker
window.changeColor = changeColor
window.throwAwayCard = throwAwayCard
window.takeOutCard = takeOutCard
// 画面遷移前に確認ダイアログを表示
window.onbeforeunload = () => { return "" };
// カラーピッカー 以外をクリックした場合にカラーピッカー表示をOFFにする
window.addEventListener('click', function (e) {
    // ピッカー、カラーが押された場合はリターン
    if (e.target.className == "imgOnCard" || e.target.className == "colorPicker" || e.target.className == "colors") { return }
    colorPicker.checkClickedPoint(whiteboard)
});

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

    runInteractjs(whiteboard)
}());

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

function changeColor(e) {
    user.changeColor(e.target.parentNode.parentNode.id, e.target.style.backgroundColor, whiteboard)
}

function toggleDisplayColorPicker(e) {
    colorPicker.toggleDisplay(e.target.parentNode.parentNode.id, whiteboard)
}

function throwAwayCard(clieckedButton) {

    console.log(clieckedButton.parentNode.id)
    // クリックされたカードIDを渡す
    user.throwAwayCard(clieckedButton.parentNode.id, garbageCan, whiteboard)
}

function takeOutCard() {
    user.takeOutCard(whiteboard, garbageCan)
}