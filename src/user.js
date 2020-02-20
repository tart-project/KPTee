import Card from './card'
import { colors } from './card-const'
import { v4 } from 'uuid'
import { sendCard, sendColor, sendDelete, sendText, sendDrag, sendResize} from './websocket-client'

export default class User {
    constructor() {
        this.id = `id-${v4()}`
    }

    createCard(whiteboard) {
        // カード作成→whiteboardに格納
        whiteboard.cards.push(new Card())
        sendCard(whiteboard.cards[whiteboard.cards.length - 1])
    }

    // カード削除
    deleteCard(clieckedCardId, whiteboard) {
        sendDelete(whiteboard.cards.find(({ id }) => id === clieckedCardId))
        // カードリストからカードID削除
        whiteboard.cards.splice(whiteboard.cards.findIndex(({ id }) => id === clieckedCardId), 1)
    }

    // カラー変更
    changeCardColor(clieckedCardId, whiteboard) {
        const target = whiteboard.cards.find(({ id }) => id === clieckedCardId)

        // カードカラーの変更
        switch (target.backgroundColor) {
            case colors.default:
                target.backgroundColor = colors.keep;
                target.changeColorButtonBackgroundColor = colors.problem;
                sendColor(target)
                break;

            case colors.keep:
                target.backgroundColor = colors.problem;
                target.changeColorButtonBackgroundColor = colors.try;
                sendColor(target)

                break;

            case colors.problem:
                target.backgroundColor = colors.try;
                target.changeColorButtonBackgroundColor = colors.default;
                sendColor(target)
                break;

            case colors.try:
                target.backgroundColor = colors.default;
                target.changeColorButtonBackgroundColor = colors.keep;
                sendColor(target)
                break;
        }
    }

    // みて欲しいところ
    changeText(chagedTextarea, whiteboard) {

        const target= whiteboard.cards.find(({ id }) => id === chagedTextarea.parentNode.id)

        target.text = chagedTextarea.textContent

        sendText(target)
    }

    // みて欲しいところ
    // TODO ドラッグ、リサイズ後にwhiteboard反映＋websocketにsendする関数
}