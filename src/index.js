import Whiteboard from './domain/whiteboard'
import User from './domain/user'
import Vue from 'vue'
import WebsocketClient from './lib/websocket-client'
import GarbageCan from './domain/garbage-can'
import Synchronizer from './lib/synchronizer'
import { runInteractjs } from './lib/interactjs'
import { colors } from './constant'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const whiteboard = new Whiteboard()
const user = new User()
const garbageCan = new GarbageCan()
const synchronizer = new Synchronizer
const websocketClient = new WebsocketClient(whiteboard, garbageCan, function (receivedInfo, whiteboard, garbageCan) { synchronizer.executeReceiveProcess(receivedInfo, whiteboard, garbageCan) })
new Vue({
    el: '#app',
    data: {
        cards: whiteboard.cards,
        colors: colors,
        garbageCan: garbageCan.cards
    }, watch: {
        cards: {
            handler: function () {
                // execute
                synchronizer.executeSendProcess(whiteboard, websocketClient)
            },
            deep: true
        },
        garbageCan: {
            handler: function () {
                synchronizer.executeSendProcess(garbageCan, websocketClient)
            },
            deep: true
        }
    }
})
let showingColorPickerId = ""

window.createCard = createCard
window.importCards = importCards
window.exportCards = exportCards
window.toggleColorPicker = toggleColorPicker
window.changeColor = changeColor
window.throwAwayCard = throwAwayCard
window.takeOutCard = takeOutCard
// 画面遷移前に確認ダイアログを表示
window.onbeforeunload = () => { return "" };
// カラーピッカー以外をクリックした場合にカラーピッカー表示をOFFにする
window.addEventListener('mousedown', checkClickedPoint, false);
// ファイルが読み込まれたら発火
document.forms.formTagForImport.importFileButton.addEventListener("change", importCards, false);

runInteractjs(whiteboard, user);

function createCard() {
    user.createCard(whiteboard)
}

function importCards(e) {
    if (e.type == "change") {
        // ファイルが読み込まれた場合
        whiteboard.importCards(e, synchronizer, websocketClient)
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
    // カラーピッカー表示ボタン、カラーピッカー内場合はリターン
    if (e.target.className.match(/colorPicker/) || e.target.className == "colors") { return }

    if (showingColorPickerId != "") {
        toggleColorPicker(showingColorPickerId)
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
    if (showingColorPickerId == "") {
        // ピッカー表示中カードない場合
        showingColorPickerId = targetCardId

    } else if (showingColorPickerId != targetCardId) {
        // クリックされたボタンがピッカー表示中カードではない場合
        changeColorPickerState(showingColorPickerId)
        showingColorPickerId = targetCardId

    } else {
        // クリックされたボタンがピッカー表示中カードだった場合
        showingColorPickerId = ""
    }
}