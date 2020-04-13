import Card from './card'
import _ from 'lodash'
import WebsocketClient from '../lib/websocket-client'

export default class Synchronizer {
    constructor(whiteboard, garbageCan) {
        this.remoteCardsInfo = []
        this.remoteGarbageCanCardsInfo = []
        this.whiteboard = whiteboard
        this.garbageCan = garbageCan
        this.websocketClient = new WebsocketClient( (receivedInfo) => { this.executeReceiveProcess(receivedInfo) })
    }

    executeSendProcess(targetObjectName) {
        let changedInfo

        if (targetObjectName == "whiteboard") {
            changedInfo = this.getChangedPointOfWhiteboard()

        } else if (targetObjectName == "garbageCan") {
            changedInfo = this.getChangedPointOfGarbageCan()
        }

        if (changedInfo != null) {
            this.reflectRemoteState(changedInfo.type, changedInfo.cardInfo)
            this.websocketClient.sendInfo(changedInfo)
        }
    }

    executeReceiveProcess(receivedInfo) {
        this.reflectRemoteState(receivedInfo.type, receivedInfo.cardInfo)

        const index = this.whiteboard.cards.findIndex(({ id }) => id === receivedInfo.cardInfo.id)

        if (receivedInfo.type == "create") {
            this.whiteboard.cards.push(new Card(receivedInfo.cardInfo))

        } else if (receivedInfo.type == "update") {
            this.whiteboard.cards.splice(index, 1, new Card(receivedInfo.cardInfo))

        } else if (receivedInfo.type == "delete") {
            this.whiteboard.cards.splice(index, 1)

        } else if (receivedInfo.type == "throwAway") {
            this.garbageCan.cardsInfo.push(receivedInfo.cardInfo)

        } else if (receivedInfo.type == "takeOut") {
            this.garbageCan.cardsInfo.pop()

        } else if (receivedInfo.type == "inisialLoad") {
            // カード情報反映
            for (const card of receivedInfo.cardsInfo) {
                this.remoteCardsInfo.push(card)
                this.whiteboard.cards.push(new Card(card))
            }

            // ゴミ箱情報連携
            for (const garbageCanCard of receivedInfo.garbageCanCardsInfo) {
                this.remoteGarbageCanCardsInfo.push(garbageCanCard)
                this.garbageCan.cardsInfo.push(garbageCanCard)
            }
        }
    }

    getChangedPointOfWhiteboard() {
        const cardsLength = this.whiteboard.cards.length
        const remoteCardsLength = this.remoteCardsInfo.length

        if (cardsLength > remoteCardsLength) {
            // カードが作成された場合
            return this.proccessChangedPointToSendInfo("create", this.whiteboard.cards[cardsLength - 1].getInfo())

        } else if (cardsLength == remoteCardsLength) {
            // カード情報が更新された場合
            for (var i = 0; i < cardsLength; i++) {
                const diff = _.omitBy(this.whiteboard.cards[i].getInfo(), (v, k) => this.remoteCardsInfo[i][k] === v)
                // _.omitByは差分がなければ{}を返す
                if (JSON.stringify(diff) != "{}") {
                    // 差分があった場合
                    return this.proccessChangedPointToSendInfo("update", this.whiteboard.cards[i].getInfo())
                }
            }

        } else if (cardsLength < remoteCardsLength) {
            // カードが削除された場合
            for (var i = 0; i < remoteCardsLength; i++) {
                if (this.whiteboard.cards.find(({ id }) => id === this.remoteCardsInfo[i].id) == undefined) {
                    // 一致するカードが無かった場合＝削除されたカード
                    return this.proccessChangedPointToSendInfo("delete", this.remoteCardsInfo[i])
                }
            }
        }
        // 自身変化→別ユーザーから変化点が送られてきた場合は上記に該当しないためnullを返却
        return null
    }

    getChangedPointOfGarbageCan() {
        const cardsLength = this.garbageCan.cardsInfo.length
        const remoteCardsLength = this.remoteGarbageCanCardsInfo.length

        if (remoteCardsLength < cardsLength) {
            // カードが削除された場合
            return this.proccessChangedPointToSendInfo("throwAway", this.garbageCan.cardsInfo[cardsLength - 1])

        } else if (remoteCardsLength > cardsLength) {
            // カードが復元された場合
            return this.proccessChangedPointToSendInfo("takeOut", this.remoteGarbageCanCardsInfo[remoteCardsLength - 1])
        }
        return null
    }

    proccessChangedPointToSendInfo(typeValue, cardInfoVale) {
        const sendInfo = { type: typeValue, cardInfo: cardInfoVale }

        return sendInfo
    }

    reflectRemoteState(type, cardInfo) {
        const index = this.remoteCardsInfo.findIndex(({ id }) => id === cardInfo.id)

        if (type == "create") {
            this.remoteCardsInfo.push(cardInfo)

        } else if (type == "update") {
            this.remoteCardsInfo.splice(index, 1, cardInfo)

        } else if (type == "delete") {
            this.remoteCardsInfo.splice(index, 1)

        } else if (type == "throwAway") {
            this.remoteGarbageCanCardsInfo.push(cardInfo)

        } else if (type == "takeOut") {
            this.remoteGarbageCanCardsInfo.pop()
        }
    }
}