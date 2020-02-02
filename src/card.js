import { colors, defaultCardInfo } from './card-const'
import { v4 } from 'uuid'
import interact from 'interactjs'

export default class Card {
    constructor(cardInfo = defaultCardInfo) {
        this.cardId = `id-${v4()}`

        // カードdiv生成
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("id", this.cardId)
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
        changeColorButton.setAttribute("style", `background-color: ${cardInfo.changeColorButton.color};`)

        // カード削除用ボタン生成
        const deleteCardButton = document.createElement("button");
        deleteCardButton.setAttribute("class", "deleteCardButton")
        deleteCardButton.setAttribute("onclick", "deleteCard(this)")
        deleteCardButton.innerHTML = "×";

        // カードdivに要素を追加
        cardDiv.appendChild(textarea);
        cardDiv.appendChild(document.createElement("br"));
        cardDiv.appendChild(changeColorButton);
        cardDiv.appendChild(deleteCardButton);

        // カードを表示
        const locationForDraggable = document.getElementById("cardCreationArea");
        locationForDraggable.appendChild(cardDiv)

        const changedPosition = { x: 0, y: 0 }

        // カードにドラッグ&ドロップ機能追加
        interact(cardDiv)
            .draggable({
                listeners: {
                    move(event) {
                        // マウスの移動分を変化量に加算(evemt.dx,dy)
                        changedPosition.x += event.dx
                        changedPosition.y += event.dy
                        cardDiv.style.transform = `translate(${changedPosition.x}px, ${changedPosition.y}px)`
                    }
                }
            }).on("dragend", () => {
                // 現在の位置情報を追加
                const cardDivRectInfo = document.getElementById(this.cardId).getBoundingClientRect();

                // 画面左上からの絶対位置+スクロールの補正分を反映
                const currentTop = cardDivRectInfo.top + window.pageYOffset;
                const currentLeft = cardDivRectInfo.left + window.pageXOffset;
                cardDiv.style.left = `${currentLeft}px`
                cardDiv.style.top = `${currentTop}px`

                // 移動距離の初期化
                changedPosition.x = 0
                changedPosition.y = 0
                cardDiv.style.transform = "translate(0px, 0px)"
            })

        // テキストエリアにリサイズ機能追加
        interact(textarea)
            .resizable({
                // resize from right or bottom edges and corners
                edges: { right: true, bottom: true },
                modifiers: [
                    // minimum size
                    interact.modifiers.restrictSize({
                        // TODO: 初期サイズと合わせる
                        min: { width: 100, height: 50 }
                    })
                ]
            })
            .on('resizemove', event => {
                // update the element's style
                textarea.style.width = `${event.rect.width}px`
                textarea.style.height = `${event.rect.height}px`
            })
    }

    // カード情報取得
    getInfo() {
        const cardDiv = document.getElementById(this.cardId)
        const textarea = document.getElementById(this.cardId).getElementsByClassName("textarea").item(0)
        const changeColorButton = document.getElementById(this.cardId).getElementsByClassName("changeColorButton").item(0)

        // カード情報生成
        // TODO: ディープ参照渡しの解決
        const cardInfo = JSON.parse(JSON.stringify(defaultCardInfo))
        cardInfo.cardId = this.cardId
        cardInfo.topPosition = cardDiv.style.top
        cardInfo.leftPosition = cardDiv.style.left
        cardInfo.color = textarea.style.backgroundColor
        cardInfo.text = textarea.value
        cardInfo.height = textarea.style.height
        cardInfo.width = textarea.style.width
        cardInfo.changeColorButton.color = changeColorButton.style.backgroundColor

        return cardInfo
    }

    // カード削除
    delete() {
        document.getElementById(this.cardId).remove();
    }

    // カラー変更
    changeColor() {
        // 対象情報を取得
        const clickedCard = document.getElementById(this.cardId).getElementsByClassName("textarea").item(0)
        const clickedButton = document.getElementById(this.cardId).getElementsByClassName("changeColorButton").item(0)

        // カードカラーの変更
        switch (clickedCard.style.backgroundColor) {
            case colors.default:
                clickedCard.style.backgroundColor = colors.keep;
                clickedButton.style.backgroundColor = colors.problem;
                break;

            case colors.keep:
                clickedCard.style.backgroundColor = colors.problem;
                clickedButton.style.backgroundColor = colors.try;
                break;

            case colors.problem:
                clickedCard.style.backgroundColor = colors.try;
                clickedButton.style.backgroundColor = colors.default;
                break;

            case colors.try:
                clickedCard.style.backgroundColor = colors.default;
                clickedButton.style.backgroundColor = colors.keep;
                break;
        }
    }
}