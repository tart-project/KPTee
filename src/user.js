import Card from './card'
import { v4 } from 'uuid'

export default class User {
    constructor() {
        this.id = `id-${v4()}`
    }

    createCard(whiteboard) {
        // カード作成→whiteboardに格納
        whiteboard.cards.push(new Card())
    }

    deleteCard(clieckedCardId, whiteboard) {
        // カードリストからカードID削除
        whiteboard.cards.splice(whiteboard.cards.findIndex(({id}) => id === clieckedCardId), 1)
    }
}