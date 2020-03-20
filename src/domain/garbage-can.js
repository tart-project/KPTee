export default class GarbageCan {
    constructor() {
        this.cards = []
    }

    addCard(card){
        this.cards.push(card)
    }

    deleteCard(){
        console.log(1)
        this.cards.pop()
    }
}