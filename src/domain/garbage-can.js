export default class GarbageCan {
    constructor() {
        this.cards = []
    }

    addCard(card){
        this.cards.push(card)
    }

    deleteCard(){
        this.cards.pop()
    }
}