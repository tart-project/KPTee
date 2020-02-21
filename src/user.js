import Card from './card'
import { colors } from './card-const'
import { v4 } from 'uuid'

export default class User {
    constructor() {
        this.id = `id-${v4()}`
    }

    createCard(whiteboard, websocket) {
        // カード作成→whiteboardに格納
        whiteboard.cards.push(new Card())
        websocket.ceateInfo(whiteboard.cards[whiteboard.cards.length - 1])
    }

    // カラー変更
    changeCardColor(clieckedCardId, whiteboard, websocket) {
        const target = whiteboard.cards.find(({ id }) => id === clieckedCardId)

        // カードカラーの変更
        switch (target.backgroundColor) {
            case colors.default:
                target.backgroundColor = colors.keep;
                target.changeColorButtonBackgroundColor = colors.problem;
                websocket.updateInfo(target)
                break;

            case colors.keep:
                target.backgroundColor = colors.problem;
                target.changeColorButtonBackgroundColor = colors.try;
                websocket.updateInfo(target)
                break;

            case colors.problem:
                target.backgroundColor = colors.try;
                target.changeColorButtonBackgroundColor = colors.default;
                websocket.updateInfo(target)
                break;

            case colors.try:
                target.backgroundColor = colors.default;
                target.changeColorButtonBackgroundColor = colors.keep;
                websocket.updateInfo(target)
                break;
        }
    }

    changeText(chagedTextarea, whiteboard, websocket) {

        const target = whiteboard.cards.find(({ id }) => id === chagedTextarea.parentNode.id)

        target.text = chagedTextarea.textContent

        websocket.updateInfo(target)
    }

    changeDrag(whiteboard, websocket, targetId, changedLeft, changedTop){

        const target = whiteboard.cards.find(({ id }) => id === targetId)
        target.left = changedLeft
        target.top = changedTop
        websocket.updateInfo(target)
    }

    changeResize(whiteboard, websocket, targetId, changedWidth, changedHeight){

        const target = whiteboard.cards.find(({ id }) => id === targetId)
        target.width = changedWidth
        target.height = changedHeight
        websocket.updateInfo(target)
    }

    // カード削除
    deleteCard(clieckedCardId, whiteboard, websocket) {
        websocket.deleteInfo(whiteboard.cards.find(({ id }) => id === clieckedCardId))
        // カードリストからカードID削除
        whiteboard.cards.splice(whiteboard.cards.findIndex(({ id }) => id === clieckedCardId), 1)
    }


}