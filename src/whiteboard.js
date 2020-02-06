import { v4 } from 'uuid'
import Card from './card'

export default class Whiteboard {
    constructor() {
        this.whiteboardId = `id-${v4()}`
        this.cards = []
    }

    exportCards() {
        this.downloadFile(this.createFileFromCards(this.cards))
    }

    // エクスポートファイル作成
    createFileFromCards(cards) {
        const exportingFile = [];

        for (const card of cards) {
            // 参照渡し回避のため、新規オブジェクト生成
            // TODO: ディープ参照渡しの解決
            const newCard = JSON.stringify(card.getCard())
            exportingFile.push(JSON.parse(newCard))
        }
        return exportingFile
    }

    // エクスポートファイルをダウンロード
    downloadFile(exportedFile) {

        // 各種設定
        const fileTitle = "kptee-cards.json";
        const exportCardsButton = document.getElementById("exportCardsButton");
        const blobObject = new Blob([JSON.stringify(exportedFile)], { type: "text/plain" });

        //ダウンロード用URL生成
        const blobObjectUrl = window.URL.createObjectURL(blobObject);
        exportCardsButton.setAttribute("href", blobObjectUrl);
        exportCardsButton.setAttribute("download", fileTitle);
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