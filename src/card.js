import { cardColors, defaultCardInfo } from './card-const'
import { v4 } from 'uuid'

//グローバル変数設定
let clickedTopPosition;
let clickedLeftPosition;

export default class Card {
    constructor(cardInfo) {
        let cardId = v4()
        this.cardId = cardId

        // カードdiv生成
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("id", cardId)
        cardDiv.setAttribute("class", "cardDiv");
        cardDiv.setAttribute("style", `top: ${cardInfo.topPosition}; left: ${cardInfo.leftPosition}`);

        // テキストエリア生成
        const textarea = document.createElement("textarea");
        textarea.setAttribute("class", "textarea");
        textarea.setAttribute("style", `background-color: ${cardInfo.color}; width: ${cardInfo.width}; height: ${cardInfo.height}`)
        textarea.innerHTML = cardInfo.text

        // カードカラー変更用ボタン生成
        const changeColorButton = document.createElement("button");
        changeColorButton.setAttribute("class", "changeColorButton")
        changeColorButton.setAttribute("onclick", "changeCardColor(this)")
        changeColorButton.innerHTML = "+";

        // カードdivに要素を追加
        cardDiv.appendChild(textarea);
        cardDiv.appendChild(document.createElement("br"));
        cardDiv.appendChild(changeColorButton);

        // カードを表示
        const locationForDraggable = document.getElementById("cardCreationArea");
        locationForDraggable.appendChild(cardDiv)

        // ドラッグアンドドロップ機能追加
        cardDiv.addEventListener("mousedown", glabCard, false);
        cardDiv.addEventListener("touchstart", glabCard, false);
    }

    getInfo() {
        // カード情報取得
        const cardDivInfo = document.getElementById(this.cardId)
        const textAreaDivInfo = document.getElementById(this.cardId).getElementsByClassName("textarea").item(0)

        // カード情報生成
        const cardInfo = defaultCardInfo
        cardInfo.cardId = this.cardId
        cardInfo.topPosition = cardDivInfo.style.top
        cardInfo.leftPosition = cardDivInfo.style.left
        cardInfo.color = textAreaDivInfo.style.backgroundColor
        cardInfo.text = textAreaDivInfo.value
        cardInfo.height = textAreaDivInfo.style.height
        cardInfo.width = textAreaDivInfo.style.width

        return cardInfo
    }
}

// マウスがクリックされた場合実行
function glabCard(e) {
    const cursorEvent = e

    //タッチイベントとマウスイベントは差異があるためイベントの差異を吸収
    if (e.type != "mousedown") {
        // イベントがタッチイベントだった場合
        cursorEvent = e.changedTouches[0];
    }

    // 要素内の相対座標を取得
    clickedLeftPosition = cursorEvent.pageX - this.offsetLeft;
    clickedTopPosition = cursorEvent.pageY - this.offsetTop;

    // ドラッグイベントの追加
    this.addEventListener("mousemove", dragCard, false);
    this.addEventListener("touchmove", dragCard, false);

    // ドロップイベントの追加
    this.addEventListener("mouseup", dropCard, false);
    this.addEventListener("mouseleave", dropCard, false);
    this.addEventListener("touchend", dropCard, false);
    this.addEventListener("touchleave", dropCard, false);
}

//マウスカーソルが動いた場合実行
function dragCard(e) {
    const cursorEvent = e

    // マウスとタッチの差異を吸収
    if (e.type != "mousemove") {
        // イベントがタッチイベントだった場合
        cursorEvent = e.changedTouches[0];
    }

    // フリックしたときに画面を動かさないようにデフォルト動作を抑制
    cursorEvent.preventDefault();

    // マウスが動いた場所に要素を動かす
    this.style.top = `${cursorEvent.pageY - clickedTopPosition}px`;
    this.style.left = `${cursorEvent.pageX - clickedLeftPosition}px`;
}

// マウスボタンが上がったら発火
function dropCard(e) {
    // 対象外の要素にも反応してしまうためエラー回避
    if (this != undefined) {
        // イベントの消去
        this.removeEventListener("mousemove", dragCard, false);
        this.removeEventListener("mouseup", dropCard, false);
        this.removeEventListener("touchmove", dragCard, false);
        this.removeEventListener("touchend", dropCard, false);
    }
}

export function changeCardColor(clickedElementInfo) {
    const clickedCardInfo = document.getElementById(clickedElementInfo.parentNode.id).getElementsByClassName("textarea").item(0)

    // カードカラーの変更
    switch (clickedCardInfo.style.backgroundColor) {
        case cardColors.default:
            clickedCardInfo.style.backgroundColor = cardColors.keep;
            break;

        case cardColors.keep:
            clickedCardInfo.style.backgroundColor = cardColors.problem;
            break;

        case cardColors.problem:
            clickedCardInfo.style.backgroundColor = cardColors.try;
            break;

        case cardColors.try:
            clickedCardInfo.style.backgroundColor = cardColors.default;
            break;
    }
}