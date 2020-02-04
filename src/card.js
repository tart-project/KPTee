import { defaultCard } from './card-const'
import { v4 } from 'uuid'

export default class Card {
    constructor(card = defaultCard) {
        if (card.cardId == ""){
            this.cardId = `id-${v4()}`
        } else{
            this.cardId = card.cardId
        }
        this.cardDivStyleObj = card.cardDivStyleObj
        this.text = card.text
        this.textareaStyleObj = card.textareaStyleObj
        this.changeColorButtonStyleObj = card.changeColorButtonStyleObj
    }

    // カード情報取得
    getCard() {
        const cardDiv = document.getElementById(this.cardId)
        const textarea = cardDiv.getElementsByClassName("textarea").item(0)
        const changeColorButton = cardDiv.getElementsByClassName("changeColorButton").item(0)

        // カード情報生成
        // TODO: ディープ参照渡しの解決
        const card = JSON.parse(JSON.stringify(defaultCard))
        card.cardId = this.cardId
        card.cardDivStyleObj.top = cardDiv.style.top
        card.cardDivStyleObj.left = cardDiv.style.left
        card.text = textarea.value
        card.textareaStyleObj.backgroundColor = textarea.style.backgroundColor
        card.textareaStyleObj.width = textarea.style.width
        card.textareaStyleObj.height = textarea.style.height
        card.changeColorButtonStyleObj.backgroundColor = changeColorButton.style.backgroundColor

        return card
    }
}