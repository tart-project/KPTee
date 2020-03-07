import { colors } from './card-const'

export default class ColorsPicker {
	constructor() {
		this.colors = colors
		// ピッカーを表示しているカードを特定するために保持
		this.pickerId = ""
	}

	// pickerが表示中に他要素をクリックした場合にpickerを非表示
	checkClickedPoint(e, whiteboard) {
		if (e.target.className == "imgOnCard" || e.target.className == "picker" || e.target.className == "colors") {
			// ピッカー、カラーが押された場合はリターン
			return
		}
		if (this.pickerId != "") {
			let target = whiteboard.cards.find(({ id }) => id === this.pickerId)
			if (target.pickerShowOrHideFlag) {
				target.pickerShowOrHideFlag = false
				this.pickerId = ""
			}
		}
	}

	showAndHide(e, whiteboard) {
		let target = whiteboard.cards.find(({ id }) => id === e.target.parentNode.parentNode.id)
		if (this.pickerId != "" && this.pickerId != target.id) {
			whiteboard.cards.find(({ id }) => id === this.pickerId).pickerShowOrHideFlag = false
		}
		else if (this.pickerId != "" && this.pickerId == target.id) {
			this.pickerId = ""
		}
		target.pickerShowOrHideFlag = !target.pickerShowOrHideFlag
		this.pickerId = target.id
	}
}