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
        garbageCan.cards.push(whiteboard.cards[whiteboard.cards.findIndex(({ id }) => id === clieckedCardId)])

        // Delete a card from a whiteboard
        whiteboard.cards.splice(whiteboard.cards.findIndex(({ id }) => id === clieckedCardId), 1)
    }

    restoreCard(whiteboard, garbageCan) {
        if (garbageCan.cards.length != 0) {
            // if there is a archive card
            const archivedCardInfo = garbageCan.cards[garbageCan.cards.length - 1]

            whiteboard.cards.push(archivedCardInfo)


            // Delete target card information
            garbageCan.cards.pop()
        }
    }




    changeCardColor(clieckedCardId, whiteboard) {
        const targetIndex = whiteboard.cards.findIndex(({ id }) => id === clieckedCardId)

        switch (whiteboard.cards[targetIndex].backgroundColor) {
            case colors.default:
                whiteboard.cards[targetIndex].backgroundColor = colors.keep;
                whiteboard.cards[targetIndex].changeColorButtonBackgroundColor = colors.problem;
                break;

            case colors.keep:
                whiteboard.cards[targetIndex].backgroundColor = colors.problem;
                whiteboard.cards[targetIndex].changeColorButtonBackgroundColor = colors.try;
                break;

            case colors.problem:
                whiteboard.cards[targetIndex].backgroundColor = colors.try;
                whiteboard.cards[targetIndex].changeColorButtonBackgroundColor = colors.default;
                break;

            case colors.try:
                whiteboard.cards[targetIndex].backgroundColor = colors.default;
                whiteboard.cards[targetIndex].changeColorButtonBackgroundColor = colors.keep;
                break;
        }
    }
}