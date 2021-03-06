import Card from './card'

export default class Whiteboard {
    constructor() {
        this.cards = []
    }

    // エクスポートファイルをダウンロード
    downloadFile(clickedButton) {
        const cardsInfo = this.getCardsInfo()
        const fileTitle = "kptee-cards.json";
        const exportCardsButton = clickedButton;
        const blobObject = new Blob([JSON.stringify(cardsInfo)], { type: "text/plain" });
        const downloadUrl = window.URL.createObjectURL(blobObject);

        exportCardsButton.setAttribute("href", downloadUrl);
        exportCardsButton.setAttribute("download", fileTitle);
    }

    getCardsInfo() {
        const returnInfo = [];
        for (const card of this.cards) {
            returnInfo.push(card.getInfo())
        }

        return returnInfo
    }

    // インポート情報→カード作成
    importCards(e, fn) {
        const fileReader = new FileReader();

        fileReader.readAsText(e.target.files[0]);
        fileReader.addEventListener("load", () => {
            const importedCards = JSON.parse(fileReader.result);

            // インポート情報を元にカードを生成
            for (const card of importedCards) {
                this.cards.push(new Card(card))
                // import時はvueのwatchが反応しないため呼び出し
                fn()
            }
        })
    }
}