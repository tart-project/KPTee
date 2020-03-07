import { colors } from './card-const'

export default class ColorsPicker {
	constructor() {
		this.colors = colors
		// ピッカーを表示しているカードを特定するために保持
		this.showingPickerId = ""
	}

	// pickerが表示中に他要素をクリックした場合にpickerを非表示
	checkClickedPoint(e, whiteboard) {
		if (e.target.className == "imgOnCard" || e.target.className == "picker" || e.target.className == "colors") {
			// ピッカー、カラーが押された場合はリターン
			return
		}
		if (this.showingPickerId != "") {
			// カラーピッカーが表示中だった場合→非表示
			const target = whiteboard.cards.find(({ id }) => id === this.showingPickerId)
			target.pickerShowOrHideFlag = false
			this.showingPickerId = ""
		}
	}

	showOrHide(e, whiteboard) {
		let target = whiteboard.cards.find(({ id }) => id === e.target.parentNode.parentNode.id)
		target.pickerShowOrHideFlag = !target.pickerShowOrHideFlag

		if (this.showingPickerId == "") {
			// ピッカー表示中カードない場合
			this.showingPickerId = target.id
			return
		} else if (this.showingPickerId != "" && this.showingPickerId != target.id) {
			// クリックされたボタンがピッカー表示中カードではない場合
			whiteboard.cards.find(({ id }) => id === this.showingPickerId).pickerShowOrHideFlag = false
			this.showingPickerId = target.id
			return
		} else if (this.showingPickerId != "" && this.showingPickerId == target.id) {
			// クリックされたボタンがピッカー表示中カードだった場合
			this.showingPickerId = ""
			return
		}
	}
}