import { v4 } from 'uuid'

export default class GarbageCan {
    constructor() {
        this.id = `id-${v4()}`
        this.cards = []
    }
}