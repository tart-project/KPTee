import Card from './card'
import { colors } from './card-const'
import { v4 } from 'uuid'

export default class User {
    constructor() {
        this.id = `id-${v4()}`
    }

    createCard(whiteboard) {
        whiteboard.cards.push(new Card())
    }

    deleteCard(clieckedCardId, whiteboard, garbageCan) {

        // Add a card to a garbage can
        garbageCan.cards.push(whiteboard.cards.find(({ id }) => id === clieckedCardId))

        // Delete a card from a whiteboard
        whiteboard.cards.splice(whiteboard.cards.findIndex(({ id }) => id === clieckedCardId), 1)
    }

    restoreCard(whiteboard, garbageCan) {
        if (garbageCan.cards.length != 0) {
            // if there is a archive card
            // Restore target card 
            whiteboard.cards.push(garbageCan.cards.pop())
        }
    }

    changeCardColor(clieckedCardId, whiteboard) {
        const target = whiteboard.cards.find(({ id }) => id === clieckedCardId)

        // カードカラーの変更
        switch (target.backgroundColor) {
            case colors.default:
                target.backgroundColor = colors.keep;
                target.changeColorButtonBackgroundColor = colors.problem;
                break;

            case colors.keep:
                target.backgroundColor = colors.problem;
                target.changeColorButtonBackgroundColor = colors.try;
                break;

            case colors.problem:
                target.backgroundColor = colors.try;
                target.changeColorButtonBackgroundColor = colors.default;
                break;

            case colors.try:
                target.backgroundColor = colors.default;
                target.changeColorButtonBackgroundColor = colors.keep;
                break;
        }
    }
}