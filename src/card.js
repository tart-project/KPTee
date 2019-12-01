import {cardColors} from './card-const'
import {v4} from 'uuid'

//グローバル変数設定
let clickedTopPosition;
let clickedLeftPosition;

export default class Card{
    constructor(cardInfo){
        const cardId = v4()

        // カードdiv生成
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("id", cardId)
        cardDiv.setAttribute("class", "cardDiv");
        cardDiv.setAttribute("style", `top: ${cardInfo.topPosition}; left: ${cardInfo.leftPosition}`);

        // テキストエリア生成
        const textarea = document.createElement("textarea");
        textarea.setAttribute("class", "textarea");
        textarea.setAttribute("style", " background-color: " + cardInfo.color)
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

    this.addEventListener("mousemove", dragCard, false);
    this.addEventListener("touchmove", dragCard, false);

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
        //イベントリスナーの消去
        this.removeEventListener("mousemove", dragCard, false);
        this.removeEventListener("mouseup", dropCard, false);
        this.removeEventListener("touchmove", dragCard, false);
        this.removeEventListener("touchend", dropCard, false);
    }
}

export function changeCardColor(clickedElementInfo) {
    const clickedCardId = clickedElementInfo.parentNode.id;

    // 色の変更
    switch (document.getElementById(clickedCardId).children[0].style.backgroundColor) {
        case cardColors.default:
            document.getElementById(clickedCardId).children[0].style.backgroundColor = cardColors.keep;
            break;

        case cardColors.keep:
            document.getElementById(clickedCardId).children[0].style.backgroundColor = cardColors.problem;
            break;

        case cardColors.problem:
            document.getElementById(clickedCardId).children[0].style.backgroundColor = cardColors.try;
            break;

        case cardColors.try:
            document.getElementById(clickedCardId).children[0].style.backgroundColor = cardColors.default;
            break;
    }
}