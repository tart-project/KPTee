import { defaultCard } from './card-const'
import { v4 } from 'uuid'

export default class Card {
    constructor(card = defaultCard) {
        if (card.cardId == ""){
            this.cardId = `id-${v4()}`
        } else{
            this.cardId = card.cardId
        }
        this.top = card.top
        this.left = card.left
        this.backgroundColor = card.backgroundColor
        this.text = card.text
        this.width = card.width
        this.height = card.height
        this.changeColorButtonBackgroundColor = card.changeColorButton.backgroundColor
    }

    // カード情報取得
    get() {
        const cardDiv = document.getElementById(this.cardId)
        const textarea = cardDiv.getElementsByClassName("textarea").item(0)
        const changeColorButton = cardDiv.getElementsByClassName("changeColorButton").item(0)

        // カード情報生成
        // TODO: ディープ参照渡しの解決
        const card = JSON.parse(JSON.stringify(defaultCard))
        card.cardId = this.cardId
        card.top = cardDiv.style.top
        card.left = cardDiv.style.left
        card.text = textarea.value
        card.backgroundColor = textarea.style.backgroundColor
        card.width = textarea.style.width
        card.height = textarea.style.height
        card.changeColorButton.backgroundColor = changeColorButton.style.backgroundColor

        return card
    }
}