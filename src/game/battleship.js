export class Battleship {
    constructor(name, size, isVertical = false) {
        this.name = name
        this.size = size
        this.health = size
        this.sunk = false
        this.isVertical = isVertical
    }

    hit() {
        this.health -= 1
    }

    isSunk() {
        if (this.health === 0) {
            this.sunk = true
        }
        return this.sunk
    }
}