export default class RunWebsocket {
    constructor(whiteboard) {
        this.stockCards = []

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

    sendCreatedInfo(target) {
        const sendInfo = ["create", target]
        this.websocket.send(JSON.stringify(sendInfo));
    }
    sendUpdatedInfo(target) {
        const sendInfo = ["update", target]
        this.websocket.send(JSON.stringify(sendInfo));
    }
    sendDeletedInfo(target) {
        const sendInfo = ["delete", target]
        this.websocket.send(JSON.stringify(sendInfo));
    }

    checkDifference(whiteboard) {
        console.log(1)
        const cardsLength = whiteboard.cards.length
        const stockCardsLength = this.stockCards.length

        if (cardsLength > stockCardsLength) {
            // カードが作成された場合
            this.stockCards.push(whiteboard.cards[cardsLength - 1].get())
            this.sendCreatedInfo(whiteboard.cards[cardsLength - 1].get())
        } else if (cardsLength == stockCardsLength) {
            // カード情報が更新された場合
            for (var i = 0; i < cardsLength; i++) {
                const stockCard = this.stockCards[i]
                const card = whiteboard.cards[i].get()
                const diff = _.omitBy(card, (v, k) => stockCard[k] === v)
                if (JSON.stringify(diff) != "{}") {
                    this.stockCards[i] = whiteboard.cards[i].get()
                    this.sendUpdatedInfo(whiteboard.cards[i])
                    break
                }
            }
        } else if (cardsLength < stockCardsLength) {
            // カードが削除された場合
            for (var i = 0; i < stockCardsLength; i++) {
                const stockCard = this.stockCards[i]
                let card
                try {
                    card = this.cards[i].get()
                } catch (err) {
                    // cards[i]が存在しない場合エラーキャッチ
                    this.sendDeletedInfo(this.stockCards[i])
                    this.stockCards.splice(i, 1)
                    break
                }
                // 差分がなければ{}を返す
                const diff = _.omitBy(card, (v, k) => stockCard[k] === v)
                if (JSON.stringify(diff) != "{}") {
                    // 差分が出た場合
                    this.sendDeletedInfo(this.stockCards[i])
                    this.stockCards.splice(i, 1)
                    break
                }
            }
        }
    }
}