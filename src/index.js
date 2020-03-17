import Whiteboard from './domain/whiteboard'
import User from './domain/user'
import Vue from 'vue'
import GarbageCan from './domain/garbage-can'
import { runInteractjs } from './lib/interactjs'
import { colors } from './constant'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const whiteboard = new Whiteboard()
const user = new User()
const garbageCan = new GarbageCan()
new Vue({
    el: '#app',
    data: {
        cards: whiteboard.cards,
        colors: colors
    }
})

let showingCororPickerId = ""

window.createCard = createCard
window.importCards = importCards
window.exportCards = exportCards
window.toggleColorPicker = toggleColorPicker
window.changeColor = changeColor
window.throwAwayCard = throwAwayCard
window.takeOutCard = takeOutCard
// 画面遷移前に確認ダイアログを表示
window.onbeforeunload = () => { return "" };
// カラーピッカー 以外をクリックした場合にカラーピッカー表示をOFFにする
window.addEventListener('mousedown', checkClickedPoint, false);
// インポートボタンにイベントをセット→ファイルが読み込まれたら発火
document.forms.formTagForImport.importFileButton.addEventListener("change", importCards, false);

// interactjsを起動
runInteractjs(whiteboard);

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

function throwAwayCard(clieckedButton) {
    user.throwAwayCard(clieckedButton.parentNode.id, garbageCan, whiteboard)
}

function takeOutCard() {
    user.takeOutCard(whiteboard, garbageCan)
}

function changeColor(e) {
    user.changeColor(e.target.parentNode.parentNode.id, e.target.style.backgroundColor, whiteboard)
}

function toggleColorPicker(targetCardId) {
    changeColorPickerState(targetCardId)
    changePickerId(targetCardId)
}

function checkClickedPoint(e) {
    // カラーピッカー表示ボタン、カラーピッカー、カラーズが押された場合はリターン
    if (e.target.className == "imgOnCard" || e.target.className == "colorPicker" || e.target.className == "colors") { return }

    if (showingCororPickerId != "") {
        toggleColorPicker(showingCororPickerId)
    }
}

function changeColorPickerState(targetId) {

    const targetPicker = document.getElementById(targetId).lastElementChild

    if (targetPicker.style.display == "none") {
        targetPicker.style.display = "block"

    } else {
        targetPicker.style.display = "none"
    }
}

function changePickerId(targetCardId) {
    if (showingCororPickerId == "") {
        // ピッカー表示中カードない場合
        showingCororPickerId = targetCardId

    } else if (showingCororPickerId != targetCardId) {
        // クリックされたボタンがピッカー表示中カードではない場合
        changeColorPickerState(showingCororPickerId)
        showingCororPickerId = targetCardId

    } else {
        // クリックされたボタンがピッカー表示中カードだった場合
        showingCororPickerId = ""
    }
}