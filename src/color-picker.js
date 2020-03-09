import { colors } from './card-const'

export default class ColorPicker {
	constructor() {
		this.colors = colors
		// ピッカーを表示しているカードを特定するために保持
		this.showingCardId = ""
	}

	// ピッカーが表示中に他要素をクリックした場合にピッカーを非表示にする
	checkClickedPoint(e, whiteboard) {
		// ピッカー、カラーが押された場合はリターン
		if (e.target.className == "imgOnCard" || e.target.className == "colorPicker" || e.target.className == "colors") { return }

		if (this.showingCardId != "") {
			// カラーピッカーが表示中だった場合→非表示にする
			const target = whiteboard.cards.find(({ id }) => id === this.showingCardId)
			target.isColorPickerShow = false
			this.showingCardId = ""
		}
	}

	// ピッカーの表示非表示を行う
	showOrHide(e, whiteboard) {
		let target = whiteboard.cards.find(({ id }) => id === e.target.parentNode.parentNode.id)
		target.isColorPickerShow = !target.isColorPickerShow

		if (this.showingCardId == "") {
			// ピッカー表示中カードない場合
			this.showingCardId = target.id
			return
		} else if (this.showingCardId != "" && this.showingCardId != target.id) {
			// クリックされたボタンがピッカー表示中カードではない場合
			whiteboard.cards.find(({ id }) => id === this.showingCardId).isColorPickerShow = false
			this.showingCardId = target.id
			return
		} else if (this.showingCardId != "" && this.showingCardId == target.id) {
			// クリックされたボタンがピッカー表示中カードだった場合
			this.showingCardId = ""
			return
		}
	}
}