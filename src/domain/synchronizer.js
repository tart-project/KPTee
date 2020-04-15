import Card from './card'
import _ from 'lodash'
import WebsocketClient from '../lib/websocket-client'

export default class Synchronizer {
    constructor(whiteboard, garbageCan) {
        this.remoteCardsInfo = []
        this.remoteGarbageCanCardsInfo = []
        this.whiteboard = whiteboard
        this.garbageCan = garbageCan
        this.websocketClient 
    }

    start() {
        this.websocketClient = new WebsocketClient((receivedInfo) => { this.receive(receivedInfo) })
    }

    submit() {
        const changedInfo = this.getChangedPoint()

        if (changedInfo != null) {
            this.reflectDomainInfo(changedInfo.type, changedInfo.cardInfo)
            this.websocketClient.sendInfo(changedInfo)
        }
    }

    receive(receivedInfo) {
        this.reflectDomainInfo(receivedInfo.type, receivedInfo.cardInfo)
        this.reflectOtherDomainInfo(receivedInfo)
    }

    getChangedPoint() {
        const cardsLength = this.whiteboard.cards.length
        const remoteCardsLength = this.remoteCardsInfo.length

        if (cardsLength > remoteCardsLength) {
            const garbageCanCardsLength = this.garbageCan.cardsInfo.length
            const remotegarbageCanCardsLength = this.remoteGarbageCanCardsInfo.length

            if (remotegarbageCanCardsLength > garbageCanCardsLength) {
                // カードが復元された場合
                return this.proccessChangedPointToSendInfo("takeOut", this.remoteGarbageCanCardsInfo[remotegarbageCanCardsLength - 1])
            }
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
                    return this.proccessChangedPointToSendInfo("throwAway", this.remoteCardsInfo[i])
                }
            }
        }
        // 自身変化→別ユーザーから変化点が送られてきた場合は上記に該当しないためnullを返却
        return null
    }

    proccessChangedPointToSendInfo(typeValue, cardInfoVale) {
        const sendInfo = { type: typeValue, cardInfo: cardInfoVale }

        return sendInfo
    }

    reflectDomainInfo(type, cardInfo) {
        const index = this.remoteCardsInfo.findIndex(({ id }) => id === cardInfo.id)

        if (type == "create") {
            this.remoteCardsInfo.push(cardInfo)

        } else if (type == "update") {
            this.remoteCardsInfo.splice(index, 1, cardInfo)

        } else if (type == "throwAway") {
            this.remoteCardsInfo.splice(index, 1)
            this.remoteGarbageCanCardsInfo.push(cardInfo)

        } else if (type == "takeOut") {
            this.remoteCardsInfo.push(cardInfo)
            this.remoteGarbageCanCardsInfo.pop()
        }
    }

    reflectOtherDomainInfo(receivedInfo){
        const index = this.whiteboard.cards.findIndex(({ id }) => id === receivedInfo.cardInfo.id)
        
        if (receivedInfo.type == "create") {
            this.whiteboard.cards.push(new Card(receivedInfo.cardInfo))

        } else if (receivedInfo.type == "update") {
            this.whiteboard.cards.splice(index, 1, new Card(receivedInfo.cardInfo))

        } else if (receivedInfo.type == "throwAway") {
            this.whiteboard.cards.splice(index, 1)
            this.garbageCan.cardsInfo.push(receivedInfo.cardInfo)

        } else if (receivedInfo.type == "takeOut") {
            this.whiteboard.cards.push(new Card(this.garbageCan.cardsInfo.pop()))

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
}