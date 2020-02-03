import Card from './card'
import { colors } from './card-const'
import { v4 } from 'uuid'

export default class User {
    constructor() {
        this.UserId = `id-${v4()}`
    }

    createCard(whiteboard) {
        // カードの生成
        const card = new Card()
        // カードリストにidを追加
        whiteboard.cardList.push(card)
    }

    // カード削除
    deleteCard(clieckedCardId, whiteboard) {
        document.getElementById(clieckedCardId).remove();

        // カードリストからカードID削除
        whiteboard.cardList.splice(whiteboard.cardList.findIndex(({cardId}) => cardId === clieckedCardId), 1)
    }

    // カラー変更
    changeColor(cardId) {
        // 対象情報を取得
        const clickedCard = document.getElementById(cardId).getElementsByClassName("textarea").item(0)
        const clickedButton = document.getElementById(cardId).getElementsByClassName("changeColorButton").item(0)

        // カードカラーの変更
        switch (clickedCard.style.backgroundColor) {
            case colors.default:
                clickedCard.style.backgroundColor = colors.keep;
                clickedButton.style.backgroundColor = colors.problem;
                break;

            case colors.keep:
                clickedCard.style.backgroundColor = colors.problem;
                clickedButton.style.backgroundColor = colors.try;
                break;

            case colors.problem:
                clickedCard.style.backgroundColor = colors.try;
                clickedButton.style.backgroundColor = colors.default;
                break;

            case colors.try:
                clickedCard.style.backgroundColor = colors.default;
                clickedButton.style.backgroundColor = colors.keep;
                break;
        }
    }
}




