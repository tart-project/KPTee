//グローバル変数設定
let cardsInfo;
let clickedLeftPosition;
let clickedTopPosition;
/*山田さんのCSSによって変更する*/
const defaultCardInfo = {
    "cardNo": "",
    "topPosition": "550px",
    "leftPosition": "900px",
    "text": ""
};

//即時関数：初期カード設定
(function () {
    //要素の取得
    cardsInfo = document.getElementsByClassName("drag-and-drop");
})()

// カード作成関数
function createCard(creatingCardInfo = {}) {
    if (creatingCardInfo.cardNo === undefined) {
        creatingCardInfo = defaultCardInfo
    }

    // カード生成divタグを生成
    const newDivTagForCard = document.createElement("div");
    newDivTagForCard.setAttribute("class", "drag-and-drop");
    newDivTagForCard.setAttribute("style", "top: " + creatingCardInfo.topPosition + ";" + " left: " + creatingCardInfo.leftPosition);

    // カード情報生成
    const card = document.createElement("textarea");
    card.setAttribute("class", "card");
    card.innerHTML = creatingCardInfo.text

    // divタグ内にカード要素追加
    newDivTagForCard.appendChild(card);

    // カードエリア情報を取得
    const cardArea = document.getElementsByTagName("div").item(0);

    // カードエリアにカードを追加
    cardArea.appendChild(newDivTagForCard)

    // ドラックアンドドロップ機能追加
    cardsInfo[cardsInfo.length - 1].addEventListener("mousedown", glabCard, false);
    cardsInfo[cardsInfo.length - 1].addEventListener("touchstart", glabCard, false);
}


// マウスがクリックされた場合実行
function glabCard(e) {
    let cursorEvent = e

    //クラス名に .drag を追加
    this.classList.add("drag");

    //タッチイベントとマウスイベントは差異があるためイベントの差異を吸収
    if (e.type != "mousedown") {
        // イベントがタッチイベントだった場合
        cursorEvent = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    clickedLeftPosition = cursorEvent.pageX - this.offsetLeft;
    clickedTopPosition = cursorEvent.pageY - this.offsetTop;

    //ムーブイベントにコールバック
    document.body.addEventListener("mousemove", dragCard, false);
    document.body.addEventListener("touchmove", dragCard, false);
}

//マウスカーソルが動いた場合実行
function dragCard(e) {
    let cursorEvent = e

    //ドラッグしている要素を取得
    let drag = document.getElementsByClassName("drag")[0];

    //同様にマウスとタッチの差異を吸収
    if (e.type != "mousemove") {
        // イベントがタッチイベントだった場合
        cursorEvent = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    cursorEvent.preventDefault();

    //マウスが動いた場所に要素を動かす
    drag.style.top = cursorEvent.pageY - clickedTopPosition + "px";
    drag.style.left = cursorEvent.pageX - clickedLeftPosition + "px";

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", dropCard, false);
    document.body.addEventListener("mouseleave", dropCard, false);
    drag.addEventListener("touchend", dropCard, false);
    document.body.addEventListener("touchleave", dropCard, false);
}

//マウスボタンが上がったら発火
function dropCard(e) {

    let drag = document.getElementsByClassName("drag")[0];

    // 対象外の要素にも反応してしまうためエラー回避
    if (drag != undefined) {

        //ムーブイベントハンドラの消去
        document.body.removeEventListener("mousemove", dragCard, false);
        drag.removeEventListener("mouseup", dropCard, false);
        document.body.removeEventListener("touchmove", dragCard, false);
        drag.removeEventListener("touchend", dropCard, false);

        //クラス名 .drag も消す
        drag.classList.remove("drag");
    }
}