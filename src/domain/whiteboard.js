import Card from './card'

export default class Whiteboard {
    constructor() {
        this.cards = []
    }

    createCard(card) {
        this.cards.push(new Card(card))
    }

    readCards() {
        const returnInfo = [];
            for (const card of this.cards) {
                // 参照渡し回避のため、新規オブジェクト生成
                // TODO: ディープ参照渡しの解決
                const cardInfo = JSON.stringify(card.get())
                returnInfo.push(JSON.parse(cardInfo))
            }

        return returnInfo
    }

    updateCard(card) {
        const index = this.cards.findIndex(({ id }) => id === card.id)
        this.cards.splice(index, 1, new Card(card))
    }

    takeOutCard(card) {
        const index = this.cards.findIndex(({ id }) => id === card.id)
        this.cards.splice(index, 1)
    }

    // エクスポートファイルをダウンロード
    downloadFile(clieckedButton) {

        const cardsInfo = this.readCards()
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

