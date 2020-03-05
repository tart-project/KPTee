import { colors } from './card-const'

export default class ColorsPicker {
	constructor() {
		this.colors = colors
		// ピッカーを表示しているカードを特定するために保持
		this.pickersFlagId = ""
	}

	// pickerが表示中に他要素をクリックした場合にpickerを非表示
	checkClickedPoint(e, whiteboard) {
		if (e.target.className == "imagesOnCard" || e.target.className == "picker" || e.target.className == "pickers") { return }
		if (this.pickersFlagId != "") {
			let target = whiteboard.cards.find(({ id }) => id === this.pickersFlagId)
			if (target.colorPickerFlag) {
				target.colorPickerFlag = false
			}
		}
	}

	showAndHide(e, whiteboard) {
		let target = whiteboard.cards.find(({ id }) => id === e.target.parentNode.parentNode.id)
		target.colorPickerFlag = !target.colorPickerFlag
		this.pickersFlagId = target.id
	}
}