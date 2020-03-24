export default class WebsocketClient {
    constructor(whiteboard, garbageCan) {
        this.stockCards = []
        this.stockGarbageCanCards = []
        this.websocket = new WebSocket('ws://127.0.0.1:5001');
        // 他のクライアントから受信した場合に発火
        this.websocket.addEventListener('message', (e) => {
            this.receiveCardInfo(e, whiteboard, garbageCan)
        });
    }

    receiveCardInfo(e, whiteboard, garbageCan){
        const receivedType = JSON.parse(e.data).type
        const receivedCard = JSON.parse(e.data).card

        const index = whiteboard.cards.findIndex(({ id }) => id === receivedCard.id)

        if (receivedType == "create") {
            this.stockCards.push(receivedCard)
            whiteboard.createCard(receivedCard)

        } else if (receivedType == "update") {
            this.stockCards.splice(index, 1)
            this.stockCards.push(receivedCard)
            whiteboard.updateCard(index, receivedCard)

        } else if (receivedType == "delete") {
            this.stockCards.splice(index, 1)
            whiteboard.deleteCard(index)

        } else if (receivedType == "addCardToGarbegeCan") {
            this.stockGarbageCanCards.push(receivedCard)
            garbageCan.addCard(receivedCard)

        } else if (receivedType == "deleteCardFromGarbegeCan") {
            this.stockGarbageCanCards.pop()
            garbageCan.deleteCard()

        } else if (receivedType == "inisialLoad") {
            // 初期ロード時
            for (const card of receivedCard) {
                this.stockCards.push(card)
                whiteboard.createCard(card)
            }
        }
    }

    sendChengedInfo(chengedInfo) {
        if (chengedInfo != null) {
            this.websocket.send(JSON.stringify(chengedInfo));
        }
    }

    getChangedPointOfWhiteboard(whiteboard) {
        const cardsLength = whiteboard.cards.length
        const stockCardsLength = this.stockCards.length

        if (cardsLength > stockCardsLength) {
            // カードが作成された場合
            const createdCard = whiteboard.cards[cardsLength - 1].get()

            return this.makeSendInfo("create", createdCard, null)

        } else if (cardsLength == stockCardsLength) {
            // カード情報が更新された場合
            for (var i = 0; i < cardsLength; i++) {
                const stockCard = this.stockCards[i]
                const updatedCard = whiteboard.cards[i].get()
                const diff = _.omitBy(updatedCard, (v, k) => stockCard[k] === v) 

                // _.omitByは差分がなければ{}を返す
                if (JSON.stringify(diff) != "{}") {
                    // 差分があった場合
                    return this.makeSendInfo("update", updatedCard, i)
                }
            }

        } else if (cardsLength < stockCardsLength) {
            // カードが削除された場合
            for (var i = 0; i < stockCardsLength; i++) {
                if (whiteboard.cards.find(({ id }) => id === this.stockCards[i].id) == undefined) {
                    // 一致するカードが無かった場合＝削除されたカード
                    const deletedCard = this.stockCards[i]

                    return this.makeSendInfo("delete", deletedCard, i)
                }
            }
        }
        // 別ユーザーから変化点が送られてきた場合は上記に該当しないためnullを返却
        return null
    }

    getChangedPointOfGarbageCan(garbageCan) {
        const cardsLength = garbageCan.cards.length
        const stockcardsLength = this.stockGarbageCanCards.length

        if (stockcardsLength < cardsLength) {
            // カードが削除された場合
            const deletedCard = garbageCan.cards[cardsLength - 1]

            return this.makeSendInfo("addCardToGarbegeCan", deletedCard)

        } else if (stockcardsLength > cardsLength) {
            // カードが復元された場合
            const restoredCard = this.stockGarbageCanCards[stockcardsLength - 1]

            return this.makeSendInfo("deleteCardFromGarbegeCan", restoredCard)
        }
        return null
    }

    makeSendInfo(type, cardInfo, index) {
        const sendInfo = { type: type, card: cardInfo, index: index }

        this.reflectStockState(type, cardInfo, index)

        return sendInfo
    }

    reflectStockState(type, card, index) {
        if (type == "create") {
            this.stockCards.push(card)

        } else if (type == "update") {
            this.stockCards[index] = card

        } else if (type == "delete") {
            this.stockCards.splice(index, 1)

        } else if (type == "addCardToGarbegeCan") {
            this.stockGarbageCanCards.push(card)

        } else if (type == "deleteCardFromGarbegeCan") [
            this.stockGarbageCanCards.pop()
        ]
    }

}