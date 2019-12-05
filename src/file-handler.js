import Card from './card'
import { importCardsInfo } from './index'

// インポートボタンにイベントをセット
(function () {
    const importLocationInfo = document.forms.formTagForImport;

    // ファイルが読み込まれたら発火
    importLocationInfo.importFileButton.addEventListener("change", importCardsInfo, false)
}());

// エクスポートファイル作成
export function createFileFromCards(cardsList) {
    const exportingCardsInfo = [];

    for (var i in cardsList) {
        // 参照渡し回避のため、新規オブジェクト生成
        const newCardObject = Object.assign({}, cardsList[i].getInfo())
        exportingCardsInfo.push(newCardObject)
    }
    return exportingCardsInfo
}

// エクスポートファイルをダウンロード
export function downloadFile(exportedFileInfo) {

    // 各種設定
    const stringCardsInfo = JSON.stringify(exportedFileInfo);
    const fileTitle = "KPTeeCards.json";
    const linkTag = document.getElementById("linkTagToGetCardsFile");
    const blobObject = new Blob([stringCardsInfo], { type: "text/plain" });

    //ダウンロード用URL生成
    const blobObjectUrl = window.URL.createObjectURL(blobObject);
    linkTag.setAttribute("href", blobObjectUrl);
    linkTag.setAttribute("download", fileTitle);
}

// インポート情報→カード作成
export function createCardsFromFile(importedFile) {

    // 戻り値用カードリスト
    const tempCardsList = [];

    //FileReaderのインスタンスを作成する
    let fileReader = new FileReader();

    //読み込んだファイルの中身を取得する
    fileReader.readAsText(importedFile);

    //ファイルの中身を取得後に処理を行う
    fileReader.addEventListener("load", function () {

        // インポート情報を取得
        const importedCardsInfo = JSON.parse(fileReader.result);

        // インポート情報を元にカードを生成
        for (var i in importedCardsInfo) {
            tempCardsList.push(new Card(importedCardsInfo[i]))
        }
    })
    return tempCardsList
}