var cardsInfo;

//要素内のクリックされた位置を取得するグローバル（のような）変数
var x;
var y;

(function () {
    //要素の取得
    cardsInfo = document.getElementsByClassName("drag-and-drop");

    //マウスが要素内で押されたとき、又はタッチされたとき発火
    for (var i = 0; i < cardsInfo.length; i++) {
        cardsInfo[i].addEventListener("mousedown", mdown, false);
        cardsInfo[i].addEventListener("touchstart", mdown, false);
    }



})()

function createCard() {

    var new_card_area = document.createElement("div");
    new_card_area.setAttribute("class", "drag-and-drop");
    new_card_area.setAttribute("id", "red-box");

    var new_card = document.createElement("TEXTAREA");
    new_card.setAttribute("class", "card");

    new_card_area.appendChild(new_card);


    //指定した引数の要素を全て返す
    var objBody = document.getElementsByTagName("div").item(0);
    console.log(objBody)
    objBody.appendChild(new_card_area)



    cardsInfo[cardsInfo.length - 1].addEventListener("mousedown", mdown, false);
    cardsInfo[cardsInfo.length - 1].addEventListener("touchstart", mdown, false);


}


//マウスが押された際の関数
function mdown(e) {

    //クラス名に .drag を追加
    this.classList.add("drag");

    //タッチデイベントとマウスのイベントの差異を吸収
    if (e.type === "mousedown") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;

    //ムーブイベントにコールバック
    document.body.addEventListener("mousemove", mmove, false);
    document.body.addEventListener("touchmove", mmove, false);
}

//マウスカーソルが動いたときに発火
function mmove(e) {

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
    drag.style.top = event.pageY - y + "px";
    drag.style.left = event.pageX - x + "px";

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
    drag.addEventListener("touchend", mup, false);
    document.body.addEventListener("touchleave", mup, false);

}

//マウスボタンが上がったら発火
function mup(e) {
    var drag = document.getElementsByClassName("drag")[0];

    //ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mup, false);
    document.body.removeEventListener("touchmove", mmove, false);
    drag.removeEventListener("touchend", mup, false);

    //クラス名 .drag も消す
    drag.classList.remove("drag");
}