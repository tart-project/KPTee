import Card, { changeCardColor } from './card'
import { defaultCardInfo } from './card-const'
import { createCardsFromFile, createInfoFromCards, downloadFile } from './file-handler'

// html上の関数と紐づけ
window.createCard = createCard
window.changeCardColor = changeCardColor
window.importCardsInfo = importCardsInfo
window.exportCardsInfo = exportCardsInfo

// グローバル変数設定
const cardList = [];

// インポートボタンにイベントをセット
(function () {
    const importLocationInfo = document.forms.formTagForImport;

    // ファイルが読み込まれたら発火
    importLocationInfo.importFileButton.addEventListener("change", importCardsInfo, false)
}());

// カード作成関数
function createCard() {

    // カードの生成
    const card = new Card(defaultCardInfo)

    // カードリストにidを追加
    cardList.push(card)
}

// インポート関数
export function importCardsInfo(e) {

    if (e) {
        // ファイルが読み込まれた場合→ファイル情報からカードを生成
        createCardsFromFile(e.target.files[0], function (importedCard) {

             // カードリストにidを追加
            cardList = cardList.concat(importedCard)
        })
    }
}

// エクスポート関数
function exportCardsInfo() {

    // カード情報一覧からファイル作成
    const exportedInfo = createInfoFromCards(cardList)

    //ファイルをダウンロード
    downloadFile(exportedInfo)
}