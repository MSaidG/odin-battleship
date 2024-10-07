export class Battleship {
    constructor(name, size, isVertical = false) {
        this.name = name
        this.size = size
        this.health = size
        this.isSunk = false
        this.isVertical = isVertical
    }

    hit() {
        this.health -= 1
    }

    isSunk() {
        if (this.health === 0) {
            this.isSunk = true
        }
        return this.isSunk
    }
}