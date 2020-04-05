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
            returnInfo.push(card.get())
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
        const fileTitle = "kptee-cards.json";
        const exportCardsButton = clieckedButton;
        const blobObject = new Blob([JSON.stringify(cardsInfo)], { type: "text/plain" });
        const downloadUrl = window.URL.createObjectURL(blobObject);

        exportCardsButton.setAttribute("href", downloadUrl);
        exportCardsButton.setAttribute("download", fileTitle);
    }

    // インポート情報→カード作成
    importCards(e, websocketClient) {
        const fileReader = new FileReader();

        fileReader.readAsText(e.target.files[0]);
        fileReader.addEventListener("load", () => {
            const importedCards = JSON.parse(fileReader.result);

            // インポート情報を元にカードを生成
            for (const card of importedCards) {
                this.cards.push(new Card(card))
                // import時はvueのwatchが反応しないため呼び出し
                websocketClient.sendChangedInfo(this)
            }
        })
    }
}

