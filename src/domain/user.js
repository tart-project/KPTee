import Card from './card'
import { v4 } from 'uuid'

export default class User {
    constructor() {
        this.id = `id-${v4()}`
    }

    createCard(whiteboard) {
        whiteboard.cards.push(new Card())
    }

    changeColor(cardId, CardBackgroundColor, whiteboard) {
        whiteboard.cards.find(({ id }) => id === cardId).backgroundColor = CardBackgroundColor
    }

    throwAwayCard(clieckedCardId, garbageCan, whiteboard) {
        // Add a card to a garbage can
        garbageCan.cardsInfo.push(whiteboard.cards.find(({ id }) => id === clieckedCardId).getInfo())
        // Delete a card from a whiteboard
        whiteboard.cards.splice(whiteboard.cards.findIndex(({ id }) => id === clieckedCardId), 1)
    }

    takeOutCard(whiteboard, garbageCan) {
        if (garbageCan.cardsInfo.length != 0) {
            // if there is a archive card
            whiteboard.cards.push(new Card(garbageCan.cardsInfo.pop()))
        }
    }

    changeDragedInfo(whiteboard, targetId, changedLeft, changedTop) {
        const target = whiteboard.cards.find(({ id }) => id === targetId)
        target.left = changedLeft
        target.top = changedTop
    }

    changeResizedInfo(whiteboard, targetId, changedWidth, changedHeight) {
        const target = whiteboard.cards.find(({ id }) => id === targetId)
        target.width = changedWidth
        target.height = changedHeight
    }
}