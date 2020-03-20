export default class RunWebsocket {
    constructor(whiteboard, garbageCan) {
        this.stockCards = []
        this.stockGarbageCanCards = []

        this.websocket = new WebSocket('ws://127.0.0.1:5001');
        this.websocket.addEventListener('open', (e) => {
            // websocketに疎通された時→現状処理はなし
        });

        this.websocket.addEventListener('message', (e) => {

            // 受信した時
            const receivedType = JSON.parse(e.data)[0]
            const receivedCard = JSON.parse(e.data)[1]
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
                console.log(garbageCan.cards)
                
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
        });
    }

    sendChengedInfo(chengedInfo) {
        if (chengedInfo != null) {
            this.websocket.send(JSON.stringify(chengedInfo));
        }
    }

    checkChangedPointWhiteboard(whiteboard) {
        const cardsLength = whiteboard.cards.length
        const stockCardsLength = this.stockCards.length
        const sendInfo = []

        if (cardsLength > stockCardsLength) {
            // カードが作成された場合
            const createdCard = whiteboard.cards[cardsLength - 1].get()

            this.stockCards.push(createdCard)
            sendInfo.push("create", createdCard)

            return sendInfo

        } else if (cardsLength == stockCardsLength) {
            // カード情報が更新された場合
            for (var i = 0; i < cardsLength; i++) {
                const stockCard = this.stockCards[i]
                const updatedCard = whiteboard.cards[i].get()
                const diff = _.omitBy(updatedCard, (v, k) => stockCard[k] === v)

                // _.omitByは差分がなければ{}を返す
                if (JSON.stringify(diff) != "{}") {
                    // 差分があった場合
                    this.stockCards[i] = whiteboard.cards[i].get()
                    sendInfo.push("update", updatedCard)

                    return sendInfo
                }
            }

        } else if (cardsLength < stockCardsLength) {
            // カードが削除された場合
            for (var i = 0; i < stockCardsLength; i++) {
                const stockCard = this.stockCards[i]
                let deletedCard

                try {
                    deletedCard = whiteboard.cards[i].get()

                } catch (err) {
                    // cards[i]が存在しない場合＝最後のカードが削除された場合
                    sendInfo.push("delete", stockCard)
                    this.stockCards.splice(i, 1)

                    return sendInfo
                }

                const diff = _.omitBy(deletedCard, (v, k) => stockCard[k] === v)

                // _.omitByは差分がなければ{}を返す
                if (JSON.stringify(diff) != "{}") {
                    // 差分が出た場合
                    sendInfo.push("delete", stockCard)
                    this.stockCards.splice(i, 1)

                    return sendInfo
                }
            }
        }
        // 別ユーザーから変化点が送られてきた場合は上記に該当しないためnullを返却
        return null
    }


    checkChangedPointGarbageCan(garbageCan) {

        const cardsLength = garbageCan.cards.length
        const stockcardsLength = this.stockGarbageCanCards.length
        const sendInfo = []

        if (stockcardsLength < cardsLength) {
            // カードが削除された場合
            const deletedCard = garbageCan.cards[cardsLength - 1]
            this.stockGarbageCanCards.push(deletedCard)
            sendInfo.push("addCardToGarbegeCan", deletedCard)

            return sendInfo

        } else if (stockcardsLength > cardsLength) {
            // カードが復元された場合
            sendInfo.push("deleteCardFromGarbegeCan", this.stockGarbageCanCards.pop())

            return sendInfo

        }
        return null
    }
}