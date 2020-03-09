import Card from './card'
import _ from 'lodash';

export default class Whiteboard {
    constructor() {
        this.cards = []
        this.stockCards = []
    }

    createCard(card) {
        this.stockCards.push(card)
        this.cards.push(new Card(card))
    }

    readCard(targetType, targetIndex) {
        const info = [];
        if (targetType == "cards") {
            for (const card of this.cards) {
                // 参照渡し回避のため、新規オブジェクト生成
                // TODO: ディープ参照渡しの解決
                const newCard = JSON.stringify(card.get())
                info.push(JSON.parse(newCard))
            }
        } else if (targetType == "card") {
            info.push(this.cards[targetIndex])
        }
        return info
    }

    updateCard(targetIndex, card) {
        this.stockCards.splice(targetIndex, 1)
        this.stockCards.push(card)
        this.cards.splice(targetIndex, 1)
        this.cards.push(new Card(card))
    }

    deleteCard(targetIndex) {
        this.stockCards.splice(targetIndex, 1)
        this.cards.splice(targetIndex, 1)
    }

    // エクスポートファイルをダウンロード
    downloadFile(clieckedButton) {

        const cardsInfo = this.readCard("cards")

        // 各種設定
        const fileTitle = "kptee-cards.json";
        const exportCardsButton = clieckedButton;
        const blobObject = new Blob([JSON.stringify(cardsInfo)], { type: "text/plain" });

        //ダウンロード用URL生成
        const blobObjectUrl = window.URL.createObjectURL(blobObject);
        exportCardsButton.setAttribute("href", blobObjectUrl);
        exportCardsButton.setAttribute("download", fileTitle);
    }

    // インポート情報→カード作成
    importCards(e, websocket) {

        //FileReaderのインスタンスを作成する
        const fileReader = new FileReader();

        //読み込んだファイルの中身を取得する
        fileReader.readAsText(e.target.files[0]);

        //ファイルの中身を取得後に処理を行う
        fileReader.addEventListener("load", () => {

            // インポート情報を取得
            const importedCards = JSON.parse(fileReader.result);

            // インポート情報を元にカードを生成
            for (const card of importedCards) {
                this.cards.push(new Card(card))
                // CHECK! なぜかwatchがきかないため、差分関数を自分でよばないとだめ もしかすると処理がはやすぎる？→ストリームみたいにしないといけないかも（全体的に大人数にした時にあやしい）
                this.checkDifference(websocket)
            }
        })
    }

    checkDifference(websocket) {
        const cardsLength = this.cards.length
        const stockCardsLength = this.stockCards.length

        if (cardsLength > stockCardsLength) {
            // カードが作成された場合
            this.stockCards.push(this.cards[cardsLength - 1].get())
            websocket.sendCreatedInfo(this.cards[this.cards.length - 1].get())
        } else if (cardsLength == stockCardsLength) {
            // カード情報が更新された場合
            for (var i = 0; i < cardsLength; i++) {
                const stockCard = this.stockCards[i]
                const card = this.cards[i].get()
                const diff = _.omitBy(card, (v, k) => stockCard[k] === v)
                if (JSON.stringify(diff) != "{}") {
                    this.stockCards[i] = this.cards[i].get()
                    websocket.sendUpdatedInfo(this.cards[i])
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
                    websocket.sendDeletedInfo(this.stockCards[i])
                    this.stockCards.splice(i, 1)
                    break
                }
                // 差分がなければ{}を返す
                const diff = _.omitBy(card, (v, k) => stockCard[k] === v)
                if (JSON.stringify(diff) != "{}") {
                    // 差分が出た場合
                    websocket.sendDeletedInfo(this.stockCards[i])
                    this.stockCards.splice(i, 1)
                    break
                }
            }
        }
    }
}

