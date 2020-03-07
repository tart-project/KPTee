import { defaultCard } from '../constant'
import { v4 } from 'uuid'

export default class Card {
    constructor(card = defaultCard) {
        if (card.id == "") {
            this.id = `id-${v4()}`
        } else {
            this.id = card.id
        }
        this.top = card.top
        this.left = card.left
        this.backgroundColor = card.backgroundColor
        this.text = card.text
        this.width = card.width
        this.height = card.height
        this.colorPickerFlag = false
    }

    get() {
        // カード情報生成
        // TODO: ディープ参照渡しの解決
        const card = JSON.parse(JSON.stringify(defaultCard))
        card.id = this.id
        card.top = this.top
        card.left = this.left
        card.backgroundColor = this.backgroundColor
        card.text = this.text
        card.width = this.width
        card.height = this.height
        return card
    }
}