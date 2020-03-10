import Card from './card'
import { v4 } from 'uuid'

export default class User {
    constructor() {
        this.id = `id-${v4()}`
    }

    createCard(whiteboard) {
        whiteboard.cards.push(new Card())
    }

    deleteCard(clieckedCardId, whiteboard) {
        // カードリストからカードID削除
        whiteboard.cards.splice(whiteboard.cards.findIndex(({ id }) => id === clieckedCardId), 1)
    }

    changeColor(e, whiteboard) {
        whiteboard.cards.find(({ id }) => id === e.target.parentNode.parentNode.id).backgroundColor = e.target.style.backgroundColor
    }
    throwAwayCard(clieckedCardId, whiteboard, garbageCan) {

        // Add a card to a garbage can
        garbageCan.cards.push(whiteboard.cards.find(({ id }) => id === clieckedCardId))

        // Delete a card from a whiteboard
        whiteboard.cards.splice(whiteboard.cards.findIndex(({ id }) => id === clieckedCardId), 1)
    }

    takeOutCard(whiteboard, garbageCan) {
        if (garbageCan.cards.length != 0) {
            // if there is a archive card
            // Restore target card 
            whiteboard.cards.push(garbageCan.cards.pop())
        }
    }
    
}