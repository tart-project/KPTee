import Card from './card'
import { colors } from './card-const'
import { v4 } from 'uuid'

export default class User {
    constructor() {
        this.id = `id-${v4()}`
    }

    createCard(whiteboard) {
        // カード作成→whiteboardに格納
        whiteboard.cards.push(new Card())
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

    changeDrag(whiteboard, targetId, changedLeft, changedTop){
        const target = whiteboard.cards.find(({ id }) => id === targetId)
        target.left = changedLeft
        target.top = changedTop
    }

    changeResize(whiteboard, targetId, changedWidth, changedHeight){
        const target = whiteboard.cards.find(({ id }) => id === targetId)
        target.width = changedWidth
        target.height = changedHeight
    }

    deleteCard(clieckedCardId, whiteboard) {
        whiteboard.cards.splice(whiteboard.cards.findIndex(({ id }) => id === clieckedCardId), 1)
    }
}