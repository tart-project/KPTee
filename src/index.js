import Card, { changeCardColor } from './card'
import { defaultCardInfo } from './card-const'
import { createCardsFromFile, createFileFromCards, downloadFile } from './file-handler'

// html上の関数と紐づけ
window.createCard = createCard
window.changeCardColor = changeCardColor
window.importCardsInfo = importCardsInfo
window.exportCardsInfo = exportCardsInfo

// グローバル変数設定
const cardsList = [];

// カード作成関数
function createCard() {

    // カードの生成
    const card = new Card(defaultCardInfo)

    // カードリストにidを追加
    cardsList.push(card)
}

// インポート関数
export function importCardsInfo(e) {

    if (e) {
        // ファイルが読み込まれた場合→ファイル情報からカードを生成
        const importedCards = createCardsFromFile(e.target.files[0])

        // カードリストにidを追加
        cardsList.concat(importedCards)
    }
}

// エクスポート関数
function exportCardsInfo() {

    // カード情報一覧からファイル作成
    const exportedFile = createFileFromCards(cardsList)

    //ファイルをダウンロード
    downloadFile(exportedFile)
}