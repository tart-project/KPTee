import Card from './card'
import _ from 'lodash';

export default class Whiteboard {
    constructor() {
        this.cards = []
    }

    createCard(card) {
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
        this.cards.splice(targetIndex, 1, new Card(card))
    }

    deleteCard(targetIndex) {
        this.cards.splice(targetIndex, 1)
    }

    // エクスポートファイルをダウンロード
    downloadFile(clieckedButton) {

        const cardsInfo = this.readCard("cards")
        // 各種設定
        const fileTitle = "kptee-cards.json";
        const exportCardsButton = clieckedButton;
        const blobObject = new Blob([JSON.stringify(cardsInfo)], { type: "text/plain" });
        // ダウンロード用URL生成
        const blobObjectUrl = window.URL.createObjectURL(blobObject);

        exportCardsButton.setAttribute("href", blobObjectUrl);
        exportCardsButton.setAttribute("download", fileTitle);
    }

    // インポート情報→カード作成
    importCards(e, websocket) {
        // FileReaderのインスタンスを作成する
        const fileReader = new FileReader();

        // 読み込んだファイルの中身を取得する
        fileReader.readAsText(e.target.files[0]);

        // ファイルの中身を取得後に処理を行う
        fileReader.addEventListener("load", () => {

            // インポート情報を取得
            const importedCards = JSON.parse(fileReader.result);

            // インポート情報を元にカードを生成
            for (const card of importedCards) {
                this.cards.push(new Card(card))
                // import時はvueのwatchが反応しないため呼び出し
                websocket.sendChengedInfo(websocket.getChangedPointOfWhiteboard(this))
            }
        })
    }
}

