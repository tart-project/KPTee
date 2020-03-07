import Whiteboard from './domain/whiteboard'
import User from './domain/user'
import Vue from 'vue'
import { runInteractjs } from './lib/interactjs'
import GarbageCan from './domain/garbage-can'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RunWebsocket from './lib/websocket-client'
import ColorsPicker from './domain/color-picker'

// html上の関数と紐づけ
window.createCard = createCard
window.changeCardColor = changeCardColor
window.importCards = importCards
window.exportCards = exportCards
window.deleteCard = deleteCard
window.restoreCard = restoreCard
// 画面遷移前に確認ダイアログを表示
window.onbeforeunload = () => { return "" };

const whiteboard = new Whiteboard()
const user = new User()
const websocket = new RunWebsocket(whiteboard)
const garbageCan = new GarbageCan()
const colorPicker = new ColorsPicker()

// カラーピッカー 以外をクリックした場合にカラーピッカー表示をOFFにする
window.addEventListener('click', function (e) { colorPicker.checkClickedPoint(e, whiteboard) });

(function () {
    // インポートボタンにイベントをセット→ファイルが読み込まれたら発火
    document.forms.formTagForImport.importFileButton.addEventListener("change", importCards, false)

    new Vue({
        el: '#app',
        data: {
            cards: whiteboard.cards,
            pickers: colorPicker.colors,
            garbageCan: garbageCan.cards
        }, watch: {
            cards: {
                handler: function () {
                    whiteboard.checkDifference(websocket)
                },
                deep: true
            },
            garbageCan:{
                handler: function () {
                },
                deep: true
            }
        },
        methods: {
            showAndHide: function (e) {
                colorPicker.showAndHide(e, whiteboard)
            },
            changeColor: function (e) {
                user.changeColor(e, whiteboard)
            }
        }
    })
    runInteractjs(whiteboard, user)
}());

function createCard() {
    user.createCard(whiteboard)
}

function changeCardColor(clieckedButton) {
    user.changeCardColor(clieckedButton.parentNode.id, whiteboard)
}

function deleteCard(clieckedButton) {
    user.deleteCard(clieckedButton.parentNode.id, whiteboard, garbageCan)
}

function restoreCard() {
    user.restoreCard(whiteboard, garbageCan)
}

function importCards(e) {
    if (e.target) {
        // ファイルが読み込まれた場合
        whiteboard.importCards(e, websocket)
    }
}

function exportCards(clieckedButton) {
    whiteboard.downloadFile(clieckedButton)
}


