//グローバル変数設定
var cardsInfo;
var clickedLeftPosition;
var clickedTopPosition;
/*山田さんのCSSによって変更する*/
var defaultCardInfo = {
    "cardNo": "",
    "topPosition": "550px",
    "leftPosition": "900px",
    "text": ""
};

//随時関数：初期カード設定
(function () {
    //要素の取得
    cardsInfo = document.getElementsByClassName("drag-and-drop");
})()

// カード作成関数
function createCard(createCardInfo = {}) {
    if (JSON.stringify(createCardInfo) === "{}") {
        createCardInfo = defaultCardInfo
    }

    // カード生成divタグを生成
    var createNewDivTagForCard = document.createElement("div");
    createNewDivTagForCard.setAttribute("class", "drag-and-drop");
    createNewDivTagForCard.setAttribute("style", "top: " + createCardInfo.topPosition + ";" + " left: " + createCardInfo.leftPosition);

    // カード情報生成
    var newCard = document.createElement("TEXTAREA");
    newCard.setAttribute("class", "card");
    newCard.innerHTML = createCardInfo.text

    // divタグ内にカード要素追加
    createNewDivTagForCard.appendChild(newCard);

    // カードエリア情報を取得
    var cardArea = document.getElementsByTagName("div").item(0);

    // カードエリアにカードを追加
    cardArea.appendChild(createNewDivTagForCard)

    // ドラックアンドドロップ機能追加
    cardsInfo[cardsInfo.length - 1].addEventListener("mousedown", clickedMouse, false);
    cardsInfo[cardsInfo.length - 1].addEventListener("touchstart", clickedMouse, false);
}


// マウスがクリックされた場合実行
function clickedMouse(e) {

    //クラス名に .drag を追加
    this.classList.add("drag");

    //タッチイベントとマウスのイベントの差異を吸収
    if (e.type === "mousedown") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    clickedLeftPosition = event.pageX - this.offsetLeft;
    clickedTopPosition = event.pageY - this.offsetTop;

    //ムーブイベントにコールバック
    document.body.addEventListener("mousemove", moveCursor, false);
    document.body.addEventListener("touchmove", moveCursor, false);
}

//マウスカーソルが動いた場合実行
function moveCursor(e) {

    //ドラッグしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];

    //同様にマウスとタッチの差異を吸収
    if (e.type === "mousemove") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    //マウスが動いた場所に要素を動かす
    drag.style.top = event.pageY - clickedTopPosition + "px";
    drag.style.left = event.pageX - clickedLeftPosition + "px";

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", releasedMouse, false);
    document.body.addEventListener("mouseleave", releasedMouse, false);
    drag.addEventListener("touchend", releasedMouse, false);
    document.body.addEventListener("touchleave", releasedMouse, false);
}

//マウスボタンが上がったら発火
function releasedMouse(e) {
    var drag = document.getElementsByClassName("drag")[0];

    //ムーブイベントハンドラの消去
    document.body.removeEventListener("mousemove", moveCursor, false);
    drag.removeEventListener("mouseup", releasedMouse, false);
    document.body.removeEventListener("touchmove", moveCursor, false);
    drag.removeEventListener("touchend", releasedMouse, false);

    //クラス名 .drag も消す
    drag.classList.remove("drag");
}