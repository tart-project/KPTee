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

    // カード削除
    deleteCard(clieckedCardId, whiteboard) {
        // カードリストからカードID削除
        whiteboard.cards.splice(whiteboard.cards.findIndex(({id}) => id === clieckedCardId), 1)
    }

    // カラー変更
    changeCardColor(clieckedCardId, whiteboard) {
        const targetIndex = whiteboard.cards.findIndex(({id}) => id === clieckedCardId)
    
        // カードカラーの変更
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