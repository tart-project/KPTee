import Card from './card'
import _ from 'lodash'

export default class Synchronizer {
    constructor() {
        this.remoteCards = []
        this.remoteGarbageCanCards = []
    }

    executeSendProcess(targetObject, websocketClient) {
        let changedInfo

        if (targetObject.constructor.name == "Whiteboard") {
            changedInfo = this.getChangedPointOfWhiteboard(targetObject)

        } else if (targetObject.constructor.name == "GarbageCan") {
            changedInfo = this.getChangedPointOfGarbageCan(targetObject)
        }

        if (changedInfo != null) {
            this.reflectRemoteState(changedInfo.type, changedInfo.cardInfo)
            websocketClient.sendInfo(changedInfo)
        }
    }

    executeReceiveProcess(receivedInfo, whiteboard, garbageCan) {
        this.reflectRemoteState(receivedInfo.type, receivedInfo.cardInfo)

        const index = whiteboard.cards.findIndex(({ id }) => id === receivedInfo.cardInfo.id)

        if (receivedInfo.type == "create") {
            whiteboard.cards.push(new Card(receivedInfo.cardInfo))

        } else if (receivedInfo.type == "update") {
            whiteboard.cards.splice(index, 1, new Card(receivedInfo.cardInfo))

        } else if (receivedInfo.type == "delete") {
            whiteboard.cards.splice(index, 1)

        } else if (receivedInfo.type == "throwAway") {
            garbageCan.cards.push(new Card(receivedInfo.cardInfo))

        } else if (receivedInfo.type == "takeOut") {
            garbageCan.cards.pop()

        } else if (receivedInfo.type == "inisialLoad") {
            // カード情報反映
            for (const card of receivedInfo.cardsInfo) {
                this.remoteCards.push(card)
                whiteboard.cards.push(new Card(card))
            }

            // ゴミ箱情報連携
            for (const garbageCanCard of receivedInfo.garbageCanCardsInfo) {
                this.remoteGarbageCanCards.push(garbageCanCard)
                garbageCan.cards.push(new Card(garbageCanCard))
            }
        }
    }

    getChangedPointOfWhiteboard(whiteboard) {
        const cardsLength = whiteboard.cards.length
        const remoteCardsLength = this.remoteCards.length

        if (cardsLength > remoteCardsLength) {
            // カードが作成された場合
            return this.proccessChangedPointToSendInfo("create", whiteboard.cards[cardsLength - 1].getInfo())

        } else if (cardsLength == remoteCardsLength) {
            // カード情報が更新された場合
            for (var i = 0; i < cardsLength; i++) {
                const diff = _.omitBy(whiteboard.cards[i].getInfo(), (v, k) => this.remoteCards[i][k] === v)
                // _.omitByは差分がなければ{}を返す
                if (JSON.stringify(diff) != "{}") {
                    // 差分があった場合
                    return this.proccessChangedPointToSendInfo("update", whiteboard.cards[i].getInfo())
                }
            }

        } else if (cardsLength < remoteCardsLength) {
            // カードが削除された場合
            for (var i = 0; i < remoteCardsLength; i++) {
                if (whiteboard.cards.find(({ id }) => id === this.remoteCards[i].id) == undefined) {
                    // 一致するカードが無かった場合＝削除されたカード
                    return this.proccessChangedPointToSendInfo("delete", this.remoteCards[i])
                }
            }
        }
        // 自身変化→別ユーザーから変化点が送られてきた場合は上記に該当しないためnullを返却
        return null
    }

    getChangedPointOfGarbageCan(garbageCan) {
        const cardsLength = garbageCan.cards.length
        const remoteCardsLength = this.remoteGarbageCanCards.length

        if (remoteCardsLength < cardsLength) {
            // カードが削除された場合
            return this.proccessChangedPointToSendInfo("throwAway", garbageCan.cards[cardsLength - 1])

        } else if (remoteCardsLength > cardsLength) {
            // カードが復元された場合
            return this.proccessChangedPointToSendInfo("takeOut", this.remoteGarbageCanCards[remoteCardsLength - 1])
        }
        return null
    }

    proccessChangedPointToSendInfo(typeValue, cardInfoVale) {
        const sendInfo = { type: typeValue, cardInfo: cardInfoVale }

        return sendInfo
    }

    reflectRemoteState(type, cardInfo) {
        const index = this.remoteCards.findIndex(({ id }) => id === cardInfo.id)

        if (type == "create") {
            this.remoteCards.push(cardInfo)

        } else if (type == "update") {
            this.remoteCards.splice(index, 1, cardInfo)

        } else if (type == "delete") {
            this.remoteCards.splice(index, 1)

        } else if (type == "throwAway") {
            this.remoteGarbageCanCards.push(cardInfo)

        } else if (type == "takeOut") {
            this.remoteGarbageCanCards.pop()
        }
    }
}