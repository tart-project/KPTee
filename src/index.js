import Card, {changeCardColor} from './card'
import {defaultCardInfo} from './card-const'

window.createCard = createCard
window.changeCardColor = changeCardColor

// カード作成関数
function createCard(cardInfo = defaultCardInfo) {
    new Card(cardInfo)
}