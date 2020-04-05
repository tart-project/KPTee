export default class GarbageCan {
    constructor() {
        this.cards = []
    }

    throwAwayCard(card){
        this.cards.push(card)
    }

    takeOutCard(){
        return this.cards.pop()
    }
}