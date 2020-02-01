import Whiteboard from './whiteboard'
import User from './user'

// html上の関数と紐づけ
window.createCard = createCard
window.changeCardColor = changeCardColor
window.importCards = importCards
window.exportCards = exportCards
window.deleteCard = deleteCard
window.onbeforeunload = () => { return "" };

const whiteboard = new Whiteboard
const user = new User

// インポートボタンにイベントをセット
(function () {
    const importLocation = document.forms.formTagForImport;
    // ファイルが読み込まれたら発火
    importLocation.importFileButton.addEventListener("change", importCards, false)
}());

// カード作成関数
function createCard() {
    user.createCard(whiteboard)
}

// インポート関数
function importCards(e) {

    if (e) {
        // ファイルが読み込まれた場合→ファイル情報からカードを生成
        whiteboard.createCardsFromFile(e.target.files[0], importedCard => {

            // カードリストにidを追加
            whiteboard.cardList.push(importedCard)
        })
    }
}

// エクスポート関数
function exportCards() {

    // カード情報一覧からファイル作成
    const exportedFile = whiteboard.createFileFromCards(whiteboard.cardList)

    //ファイルをダウンロード
    whiteboard.downloadFile(exportedFile)
}

// カードカラー変更関数
function changeCardColor(clieckedButton) {

    // 対象カードID取得
    const clieckedCardId = clieckedButton.parentNode.id

    // カードカラーの変更
    user.changeColor(clieckedCardId)
}

// カード削除関数
function deleteCard(clieckedButton) {

    // 対象カードID取得
    const clieckedCardId = clieckedButton.parentNode.id

    // htmlからカード削除
    user.deleteCard(clieckedCardId)

    // 対象カード照合
    const targetCardIndex = whiteboard.cardList.findIndex((cardId) => cardId === clieckedCardId)

    // カードリストからカードID削除
    whiteboard.cardList.splice(targetCardIndex, 1)
}