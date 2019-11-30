//グローバル変数設定
let draggableCardsInfo;
let clickedLeftPosition;
let clickedTopPosition;
let draggableId = 0;
const cardColors = {
    "default": "rgb(231, 231, 231)",
    "keep": "rgb(135, 206, 250)",
    "problem": "rgb(244, 164, 96)",
    "try": "rgb(152, 251, 152)"
};
/*山田さんのCSSによって変更する*/
const defaultCardInfo = {
    "cardNo": "",
    "topPosition": "550px",
    "leftPosition": "900px",
    "color": cardColors.default,
    "text": ""
};

//即時関数：初期カード設定
(function () {
    //ドラッグアンドドロップ対象要素の取得
    draggableCardsInfo = document.getElementsByClassName("draggableDivTag");

    // インポートボタンにイベントを設定
    let importLocationInfo = document.forms.formTagForImport;
    importLocationInfo.importFileButton.addEventListener("change", importCardsInfo, false)
})()

// カード作成関数
function createCard(creatingCardInfo = {}) {
    if (creatingCardInfo.cardNo === undefined) {
        creatingCardInfo = defaultCardInfo
    }

    // cordNo用カウント
    draggableId++;


    // コンポーネントタグ生成
    const componentTag = document.createElement("div");

    // カード生成divタグを生成
    const draggableDivTag = document.createElement("div");
    draggableDivTag.setAttribute("class", "draggableDivTag");
    draggableDivTag.setAttribute("style", "top: " + creatingCardInfo.topPosition + ";" + " left: " + creatingCardInfo.leftPosition);

    // カード生成
    const card = document.createElement("textarea");
    card.setAttribute("class", "card");
    card.setAttribute("id", draggableId)
    card.setAttribute("style", " background-color: " + creatingCardInfo.color)
    card.innerHTML = creatingCardInfo.text

    // カードカラー変更用ボタン
    const buttonTagForCard = document.createElement("button");
    buttonTagForCard.setAttribute("class", "changingColorButton")
    buttonTagForCard.setAttribute("onclick", "changeCardColor(this)")
    buttonTagForCard.innerHTML = "+";

    // divタグ内にカード要素追加
    draggableDivTag.appendChild(card);
    draggableDivTag.appendChild(document.createElement("br"));
    draggableDivTag.appendChild(buttonTagForCard);

    // コンポーネントタグにカード情報を追加
    componentTag.appendChild(draggableDivTag)

    // カードエリア情報を取得
    const locationForDraggable = document.getElementsByTagName("div").item(0);

    // カードエリアにカードを追加
    locationForDraggable.appendChild(componentTag)

    // ドラッグアンドドロップ機能追加
    draggableCardsInfo[draggableCardsInfo.length - 1].addEventListener("mousedown", glabCard, false);
    draggableCardsInfo[draggableCardsInfo.length - 1].addEventListener("touchstart", glabCard, false);
}


// マウスがクリックされた場合実行
function glabCard(e) {
    let cursorEvent = e

    //クラス名に .dragging を追加
    this.classList.add("dragging");

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

    // dragging要素を取得
    let drag = document.getElementsByClassName("dragging")[0];

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", dropCard, false);
    document.body.addEventListener("mouseleave", dropCard, false);
    drag.addEventListener("touchend", dropCard, false);
    document.body.addEventListener("touchleave", dropCard, false);
}

//マウスカーソルが動いた場合実行
function dragCard(e) {
    let cursorEvent = e

    //ドラッグ中の要素を取得
    let drag = document.getElementsByClassName("dragging")[0];

    //マウスとタッチの差異を吸収
    if (e.type != "mousemove") {
        // イベントがタッチイベントだった場合
        cursorEvent = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    cursorEvent.preventDefault();

    //マウスが動いた場所に要素を動かす
    drag.style.top = cursorEvent.pageY - clickedTopPosition + "px";
    drag.style.left = cursorEvent.pageX - clickedLeftPosition + "px";
}

//マウスボタンが上がったら発火
function dropCard(e) {

    let drag = document.getElementsByClassName("dragging")[0];

    // 対象外の要素にも反応してしまうためエラー回避
    if (drag != undefined) {

        //ムーブイベントハンドラの消去
        document.body.removeEventListener("mousemove", dragCard, false);
        drag.removeEventListener("mouseup", dropCard, false);
        document.body.removeEventListener("touchmove", dragCard, false);
        drag.removeEventListener("touchend", dropCard, false);

        //クラス名 .dragging も消す
        drag.classList.remove("dragging");
    }
}

function createExportInfo() {

    // 画面上のカード情報を取得
    const allCardsInfo = document.getElementsByClassName("draggableDivTag")
    let exportingCardsInfo = [];

    for (let i = 0; i < allCardsInfo.length; i++) {
        exportingCardsInfo.push({
            "cardNo": "",
            "topPosition": "",
            "leftPosition": "",
            "color": "",
            "text": ""
        })
        exportingCardsInfo[i].cardNo = allCardsInfo.item(i).id;
        exportingCardsInfo[i].topPosition = allCardsInfo.item(i).style.top;
        exportingCardsInfo[i].leftPosition = allCardsInfo.item(i).style.left;
        exportingCardsInfo[i].color = allCardsInfo.item(i).children.item(0).style.backgroundColor;
        exportingCardsInfo[i].text = allCardsInfo.item(i).children.item(0).value;
    }
    return exportingCardsInfo
}

function downloadCardsInfoFile() {

    // 各種設定
    const stringCardsInfo = JSON.stringify(createExportInfo());
    const fileTitle = "KPTeeCards.json";
    const linkTag = document.getElementById("linkTagToGetCardsFile");
    const blobObject = new Blob([stringCardsInfo], { type: "text/plain" });

    //ダウンロード用URL生成
    const blobObjectUrl = window.URL.createObjectURL(blobObject);

    // ユーザーエージェント情報を取得
    const userAgentInfo = window.navigator.userAgent.toLowerCase();

    //　ファイル取得のためのリンク生成
    if (userAgentInfo.indexOf("msie") != -1 || userAgentInfo.indexOf("trident") != -1) {
        // ブラウザがIEだった場合
        window.navigator.msSaveOrOpenBlob(blobObject, fileTitle);
    } else {
        // ブラウザがIEじゃない場合
        linkTag.setAttribute("href", blobObjectUrl);
        linkTag.setAttribute("download", fileTitle);
    }
}

function importCardsInfo(e) {

    const importedFileInfo = e.target.files[0];

    //FileReaderのインスタンスを作成する
    let fileReader = new FileReader();
    //読み込んだファイルの中身を取得する
    fileReader.readAsText(importedFileInfo);

    //ファイルの中身を取得後に処理を行う
    fileReader.addEventListener("load", function () {

        // インポート情報を取得
        const importedCardsInfo = JSON.parse(fileReader.result);

        // インポート情報を元にカードを生成
        for (let i = 0; i < importedCardsInfo.length; i++) {
            createCard(importedCardsInfo[i]);
        }
    })
}

function changeCardColor(clickedElementInfo) {

    // クリックされたカードのidを取得
    var clickedCardId = clickedElementInfo.parentNode.children[0].id;

    // 現在のカードカラーを取得
    const currentCardColor = document.getElementById(clickedCardId).style.backgroundColor


    // 色の変更
    switch (currentCardColor) {
        case cardColors.default:
            document.getElementById(clickedCardId).style.backgroundColor = cardColors.keep;
            break;

        case cardColors.keep:
            document.getElementById(clickedCardId).style.backgroundColor = cardColors.problem;
            break;

        case cardColors.problem:
            document.getElementById(clickedCardId).style.backgroundColor = cardColors.try;
            break;

        case cardColors.try:
            document.getElementById(clickedCardId).style.backgroundColor = cardColors.default;
            break;
    }
}