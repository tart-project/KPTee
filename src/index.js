import Card from './card'
import { createCardsFromFile, createInfoFromCards, downloadFile } from './file-handler'

// html上の関数と紐づけ
window.createCard = createCard
window.changeCardColor = changeCardColor
window.importCardsInfo = importCardsInfo
window.exportCardsInfo = exportCardsInfo
window.deleteCard = deleteCard
window.onbeforeunload = function(e) {
    // IE、firefoxのみ下記のメッセージが表示
    return "エクスポートを実行しカード情報を保存してください。";
};

// グローバル変数設定
const cardList = [];

// インポートボタンにイベントをセット
(function () {
    const importLocation = document.forms.formTagForImport;

    // ファイルが読み込まれたら発火
    importLocation.importFileButton.addEventListener("change", importCardsInfo, false)
}());

// カード作成関数
function createCard() {

    // カードの生成
    const card = new Card()

    // カードリストにidを追加
    cardList.push(card)
}

// インポート関数
export function importCardsInfo(e) {

    if (e) {
        // ファイルが読み込まれた場合→ファイル情報からカードを生成
        createCardsFromFile(e.target.files[0], function (importedCard) {

            // カードリストにidを追加
            cardList.push(importedCard)
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

function changeCardColor(clieckedButton) {

    // 対象カードID取得
    const clieckedCardId = clieckedButton.parentNode.id

    // 対象カード照合
    const targetCardIndex = cardList.findIndex(({ cardId }) => cardId === clieckedCardId)

    // カードカラーの変更
    cardList[targetCardIndex].changeColor()
}

// カード削除関数
function deleteCard(clieckedButton) {

    // 対象カードID取得
    const clieckedCardId = clieckedButton.parentNode.id

    // 対象カード照合
    const targetCardIndex = cardList.findIndex(({ cardId }) => cardId === clieckedCardId)

    // カード削除
    cardList[targetCardIndex].delete()

    // カードID削除
    cardList.splice(targetCardIndex, 1)
}