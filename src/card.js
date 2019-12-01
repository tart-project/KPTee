import {cardColors} from './card-const'
import {v4} from 'uuid'

//グローバル変数設定
let clickedTopPosition;
let clickedLeftPosition;
let cardId;

export default class Card{
    constructor(cardInfo){
        cardId = v4()

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
        const drag = document.getElementById(cardId);
        drag.addEventListener("mousedown", glabCard, false);
        drag.addEventListener("touchstart", glabCard, false);
    }
}

// マウスがクリックされた場合実行
function glabCard(e) {
    let cursorEvent = e

    //タッチイベントとマウスイベントは差異があるためイベントの差異を吸収
    if (e.type != "mousedown") {
        // イベントがタッチイベントだった場合
        cursorEvent = e.changedTouches[0];
    }

    // ドラッグするカードのエレメントを取得
    const drag = document.getElementById(cardId);

    // 要素内の相対座標を取得
    clickedLeftPosition = cursorEvent.pageX - drag.offsetLeft;
    clickedTopPosition = cursorEvent.pageY - drag.offsetTop;

    drag.addEventListener("mousemove", dragCard, false);
    drag.addEventListener("touchmove", dragCard, false);

    drag.addEventListener("mouseup", dropCard, false);
    drag.addEventListener("mouseleave", dropCard, false);
    drag.addEventListener("touchend", dropCard, false);
    drag.addEventListener("touchleave", dropCard, false);
}


//マウスカーソルが動いた場合実行
function dragCard(e) {
    let cursorEvent = e

    // ドラッグするカードのエレメントを取得
    const drag = document.getElementById(cardId);

    // マウスとタッチの差異を吸収
    if (e.type != "mousemove") {
        // イベントがタッチイベントだった場合
        cursorEvent = e.changedTouches[0];
    }

    // フリックしたときに画面を動かさないようにデフォルト動作を抑制
    cursorEvent.preventDefault();

    // マウスが動いた場所に要素を動かす
    drag.style.top = `${cursorEvent.pageY - clickedTopPosition}px`;
    drag.style.left = `${cursorEvent.pageX - clickedLeftPosition}px`;
}

// マウスボタンが上がったら発火
function dropCard(e) {

    // ドラッグするカードのエレメントを取得
    const drag = document.getElementById(cardId);

    // 対象外の要素にも反応してしまうためエラー回避
    if (drag != undefined) {
        //イベントリスナーの消去
        drag.removeEventListener("mousemove", dragCard, false);
        drag.removeEventListener("mouseup", dropCard, false);
        drag.removeEventListener("touchmove", dragCard, false);
        drag.removeEventListener("touchend", dropCard, false);
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