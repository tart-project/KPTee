export default class RunWebsocket {
    constructor(whiteboard) {
        this.stockCards = []
        this.stockGarbageCanCards = []

        this.websocket = new WebSocket('ws://127.0.0.1:5001');
        this.websocket.addEventListener('open', (e) => {
            // websocketに疎通された時
            console.log('Socket connect');
        });

        this.websocket.addEventListener('message', (e) => {
            // 受信した時
            const receivedCard = JSON.parse(e.data)
            const index = whiteboard.cards.findIndex(({ id }) => id === receivedCard[1].id)

            if (receivedCard[0] == "create") {
                this.stockCards.push(receivedCard[1])
                whiteboard.createCard(receivedCard[1])
            } else if (receivedCard[0] == "update") {
                this.stockCards.splice(index, 1)
                this.stockCards.push(receivedCard[1])
                whiteboard.updateCard(index, receivedCard[1])
            } else if (receivedCard[0] == "delete") {
                this.stockCards.splice(index, 1)
                whiteboard.deleteCard(index)
            } else if (receivedCard[0] == "inisialLoad") {
                for (const card of receivedCard[1]) {
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

        if (cardsLength > stockCardsLength) {
            // カードが作成された場合
            const createdCard = whiteboard.cards[cardsLength - 1].get()
            this.stockCards.push(createdCard)
            const sendInfo = ["create", createdCard]

            return sendInfo
        } else if (cardsLength == stockCardsLength) {
            // カード情報が更新された場合
            for (var i = 0; i < cardsLength; i++) {
                const stockCard = this.stockCards[i]
                const updatedCard = whiteboard.cards[i].get()
                const diff = _.omitBy(updatedCard, (v, k) => stockCard[k] === v)
                if (JSON.stringify(diff) != "{}") {
                    this.stockCards[i] = whiteboard.cards[i].get()
                    const sendInfo = ["update", updatedCard]

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
                    const sendInfo = ["delete", stockCard]
                    this.stockCards.splice(i, 1)

                    return sendInfo
                }
                // _.omitByは差分がなければ{}を返す
                const diff = _.omitBy(deletedCard, (v, k) => stockCard[k] === v)
                if (JSON.stringify(diff) != "{}") {
                    // 差分が出た場合
                    const sendInfo = ["delete", stockCard]
                    this.stockCards.splice(i, 1)

                    return sendInfo
                }
            }
        }
        // websocketから変化点が送られてきた場合は上記に該当しないためnullを返却
        return null
    }


    checkChangedPointGarbageCan(garbageCan) {
        const garbageCanCardsLength = garbageCan.cards.length
        const stockGarbageCanCardsLength = this.stockGarbageCanCards.length

        if (stockGarbageCanCardsLength > garbageCanCardsLength) {
            // カードが復元された場合
            const sendInfo = ["garbegeFromWhiteboard", this.stockGarbageCanCards[stockGarbageCanCardsLength - 1].get()]

            this.stockGarbageCanCards.splice(stockGarbageCanCardsLength - 1, 1)

            return sendInfo
        } else if (stockGarbageCanCardsLength < garbageCanCardsLength) {
            // カードが削除された場合

            this.stockGarbageCanCards.push()

            const sendInfo = ["garbegeFromWhiteboard", this.stockGarbageCanCards[stockGarbageCanCardsLength - 1].get()]

            return sendInfo
        }

    }





}