import { v4 } from 'uuid'
import Card from './card'

export default class Whiteboard {
    constructor() {
        this.id = `id-${v4()}`
        this.cards = []
    }

    // エクスポートファイルをダウンロード
    downloadFile(clieckedButton) {

        const cardsInfo = this.createCardsInfo(this.cards)

        // 各種設定
        const fileTitle = "kptee-cards.json";
        const exportCardsButton = clieckedButton;
        const blobObject = new Blob([JSON.stringify(cardsInfo)], { type: "text/plain" });

        //ダウンロード用URL生成
        const blobObjectUrl = window.URL.createObjectURL(blobObject);
        exportCardsButton.setAttribute("href", blobObjectUrl);
        exportCardsButton.setAttribute("download", fileTitle);
    }

    // エクスポート情報作成
    createCardsInfo(cards) {
        const cardsInfo = [];

        for (const card of cards) {
            // 参照渡し回避のため、新規オブジェクト生成
            // TODO: ディープ参照渡しの解決
            const newCard = JSON.stringify(card.getCard())
            cardsInfo.push(JSON.parse(newCard))
        }
        return cardsInfo
    }

    // インポート情報→カード作成
    importCards(e) {

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
            }
        })
    }
}