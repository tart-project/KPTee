import _ from 'lodash'
import Card from '../domain/card';

export default class WebsocketClient {
    constructor(whiteboard, garbageCan) {
        this.stockCards = []
        this.stockGarbageCanCards = []
        this.websocket = new WebSocket('ws://127.0.0.1:5001');
        // 他のクライアントから受信した場合に発火
        this.websocket.addEventListener('message', (e) => {
            this.reflectReceivedInfo(e, whiteboard, garbageCan)
        });
    }

    reflectReceivedInfo(e, whiteboard, garbageCan) {
        const receivedInfo = JSON.parse(e.data)

        this.reflectStockState(receivedInfo.type, receivedInfo.cardInfo)

        if (receivedInfo.type == "create") {
            whiteboard.cards.push(new Card(receivedInfo.cardInfo))

        } else if (receivedInfo.type == "update") {
            const index = whiteboard.cards.findIndex(({ id }) => id === receivedInfo.cardInfo.id)
            whiteboard.cards.splice(index, 1, new Card(receivedInfo.cardInfo))

        } else if (receivedInfo.type == "delete") {
            const index = whiteboard.cards.findIndex(({ id }) => id === receivedInfo.cardInfo.id)
            whiteboard.cards.splice(index, 1)

        } else if (receivedInfo.type == "throwAway") {
            garbageCan.cards.push(receivedInfo.cardInfo)

        } else if (receivedInfo.type == "takeOut") {
            garbageCan.cards.pop()

        } else if (receivedInfo.type == "inisialLoad") {
            // カード情報反映
            for (const card of receivedInfo.cardsInfo) {
                this.stockCards.push(card)
                whiteboard.cards.push(new Card(card))
            }

            // ゴミ箱情報連携
            for (const garbageCanCard of receivedInfo.garbageCanCardsInfo) {
                this.stockGarbageCanCards.push(garbageCanCard)
                garbageCan.cards.push(garbageCanCard)
            }
        }
    }

    sendChangedInfo(targetObject) {
        let changedInfo

        if (targetObject.constructor.name == "Whiteboard") {
            changedInfo = this.getChangedPointOfWhiteboard(targetObject)

        } else if (targetObject.constructor.name == "GarbageCan") {
            changedInfo = this.getChangedPointOfGarbageCan(targetObject)

        } if (changedInfo != null) {
            this.websocket.send(JSON.stringify(changedInfo));
        }
    }

    getChangedPointOfWhiteboard(whiteboard) {
        const cardsLength = whiteboard.cards.length
        const stockCardsLength = this.stockCards.length

        if (cardsLength > stockCardsLength) {
            // カードが作成された場合
            const createdCard = whiteboard.cards[cardsLength - 1]

            return this.makeSendInfo("create", createdCard)

        } else if (cardsLength == stockCardsLength) {
            // カード情報が更新された場合
            for (var i = 0; i < cardsLength; i++) {
                const stockCard = this.stockCards[i]
                const aaa = stockCard.get()
                const updatedCard = whiteboard.cards[i].get()
                const diff = _.omitBy(updatedCard, (v, k) => aaa[k] === v)

                console.log(diff)

                // _.omitByは差分がなければ{}を返す
                if (JSON.stringify(diff) != "{}") {
                    console.log(111)
                    // 差分があった場合
                    return this.makeSendInfo("update", updatedCard)
                }
            }

        } else if (cardsLength < stockCardsLength) {
            // カードが削除された場合
            for (var i = 0; i < stockCardsLength; i++) {
                if (whiteboard.cards.find(({ id }) => id === this.stockCards[i].id) == undefined) {
                    // 一致するカードが無かった場合＝削除されたカード
                    const deletedCard = this.stockCards[i]

                    return this.makeSendInfo("delete", deletedCard)
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

            return this.makeSendInfo("throwAway", deletedCard)

        } else if (stockcardsLength > cardsLength) {
            // カードが復元された場合
            const restoredCard = this.stockGarbageCanCards[stockcardsLength - 1]

            return this.makeSendInfo("takeOut", restoredCard)
        }
        return null
    }

    makeSendInfo(typeValue, cardInfoVale) {
        const sendInfo = { type: typeValue, cardInfo: cardInfoVale }

        this.reflectStockState(typeValue, cardInfoVale)

        return sendInfo
    }

    reflectStockState(type, cardInfo) {
        const index = this.stockCards.findIndex(({ id }) => id === cardInfo.id)

        if (type == "create") {
            this.stockCards.push(cardInfo)

        } else if (type == "update") {
            this.stockCards.splice(index, 1, cardInfo)

        } else if (type == "delete") {
            this.stockCards.splice(index, 1)

        } else if (type == "throwAway") {
            this.stockGarbageCanCards.push(cardInfo)

        } else if (type == "takeOut") {
            this.stockGarbageCanCards.pop()
        }
    }
}