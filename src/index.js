import Whiteboard from './whiteboard'
import User from './user'
import Vue from 'vue'
import GarbageCan from './garbage-can'
import { runInteractjs } from './interactjs'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const whiteboard = new Whiteboard()
const user = new User()
const garbageCan = new GarbageCan()
new Vue({
    el: '#app',
    data: {
        cards: whiteboard.cards,
    }
})

let showingCororPickerId = ""

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
window.addEventListener('click', checkClickedPoint, false);
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
    // クリックされたカードIDを渡す
    user.throwAwayCard(clieckedButton.parentNode.id, garbageCan, whiteboard)
}

function takeOutCard() {
    user.takeOutCard(whiteboard, garbageCan)
}

function changeColor(e) {
    user.changeColor(e.target.parentNode.parentNode.id, e.target.style.backgroundColor, whiteboard)
}

function toggleDisplayColorPicker(e) {
    const targetCard = e.target.parentNode.parentNode
    if (targetCard.lastElementChild.style.display == "none") {
        targetCard.lastElementChild.style.display = "block"
    } else if (targetCard.lastElementChild.style.display == "block") {
        targetCard.lastElementChild.style.display = "none"
    }

    if (showingCororPickerId == "") {
        // ピッカー表示中カードない場合
        showingCororPickerId = targetCard.id
        return
    } else if (showingCororPickerId != targetCard.id) {
        // クリックされたボタンがピッカー表示中カードではない場合
        document.getElementById(showingCororPickerId).lastElementChild.style.display = "none"
        showingCororPickerId = targetCard.id
        return
    } else if (showingCororPickerId == targetCard.id) {
        // クリックされたボタンがピッカー表示中カードだった場合
        showingCororPickerId = ""
        return
    }
}

function checkClickedPoint(e) {
    // ピッカー、カラーが押された場合はリターン
    if (e.target.className == "imgOnCard" || e.target.className == "colorPicker" || e.target.className == "colors") { return }

    if (showingCororPickerId != "") {
        document.getElementById(showingCororPickerId).lastElementChild.style.display = "none"
        showingCororPickerId = ""
    }
}