import { defaultCard } from './card-const'
import { v4 } from 'uuid'
import interact from 'interactjs'

export default class Card {
    constructor(card = defaultCard) {
        this.cardId = `id-${v4()}`
        this.color = card.color
        this.height = card.height
        this.width = card.width
        this.top = card.topPosition
        this.left = card.leftPosition
        this.text = card.text
        this.changeColorButtonColor = card.changeColorButton.color



        /*
        cardDiv.setAttribute("id", this.cardId)
        cardDiv.setAttribute("class", "cardDiv");
        cardDiv.setAttribute("style", `top: ${card.topPosition}; left: ${card.leftPosition}`);

        // テキストエリア生成
        const textarea = document.createElement("textarea");
        textarea.setAttribute("class", "textarea");
        textarea.setAttribute("style", `background-color: ${card.color}; width: ${card.width}; height: ${card.height}`)
        textarea.innerHTML = card.text

        // カードカラー変更用ボタン生成
        const changeColorButton = document.createElement("button");
        changeColorButton.setAttribute("class", "changeColorButton")
        changeColorButton.setAttribute("onclick", "changeCardColor(this)")
        changeColorButton.setAttribute("style", `background-color: ${card.changeColorButton.color};`)

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
        interact(this.cardId)
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
            */
      
    }

    // カード情報取得
    getCard() {
        const cardDiv = document.getElementById(this.cardId)
        const textarea = document.getElementById(this.cardId).getElementsByClassName("textarea").item(0)
        const changeColorButton = document.getElementById(this.cardId).getElementsByClassName("changeColorButton").item(0)

        // カード情報生成
        // TODO: ディープ参照渡しの解決
        const card = JSON.parse(JSON.stringify(defaultCard))
        card.cardId = this.cardId
        card.topPosition = cardDiv.style.top
        card.leftPosition = cardDiv.style.left
        card.color = textarea.style.backgroundColor
        card.text = textarea.value
        card.height = textarea.style.height
        card.width = textarea.style.width
        card.changeColorButton.color = changeColorButton.style.backgroundColor

        return card
    }
}