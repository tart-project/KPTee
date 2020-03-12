import { colors } from './card-const'

export default class ColorPicker {
	constructor() {
		this.colors = colors
		// ピッカーを表示しているカードを特定するために保持
		this.showingCardId = ""
	}



	// ピッカーが表示中に他要素をクリックした場合にピッカーを非表示にする
	checkClickedPoint(whiteboard) {
		if (this.showingCardId != "") {
			this.toggleDisplay(this.showingCardId, whiteboard)
		}
	}

	// とにかく他を消す　とにかくHTMLを持たせない

	// ピッカーの表示非表示を行う
	toggleDisplay(a, whiteboard) {

		a.lastElementChild.style.display = "block"

		if (this.showingCardId == "") {
			// ピッカー表示中カードない場合
			this.showingCardId = a.id
			return
		} else if (this.showingCardId != "" && this.showingCardId != a.id) {
			// クリックされたボタンがピッカー表示中カードではない場合
			whiteboard.cards.find(({ id }) => id === this.showingCardId).isColorPickerShow = false
			this.showingCardId = a.id
			return
		} else if (this.showingCardId != "" && this.showingCardId == a.id) {
			// クリックされたボタンがピッカー表示中カードだった場合
			this.showingCardId = ""
			return
		}
	}
}





// 自分以外をクリックされたタイミングでオフマウスオーバー→マウスオフ