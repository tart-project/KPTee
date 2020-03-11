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

	// ピッカーの表示非表示を行う
	toggleDisplay(clickedId, whiteboard) {
		let target = whiteboard.cards.find(({ id }) => id === clickedId)
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