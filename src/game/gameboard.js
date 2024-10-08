export class Gameboard {

    constructor() {
        this.board = []
        this.ships = []
        
        for (let i = 0; i < 10; i++) {
            this.board.push([])
            for (let j = 0; j < 10; j++) {
                this.board[i].push({x: i, y: j, ship: null, isHit: false})
            }
        }
    }

    placeShip(ship, x, y) {
        if ((y + ship.size > 10 && ship.isVertical) ||
            (x + ship.size > 10 && !ship.isVertical)) {
            return false
        }
        if (this.checkPlacementValid(ship, x, y) === false) {
                return false
        }

        if (ship.isVertical) {
            for (let i = 0; i < ship.size; i++) {
                this.board[x][y + i].ship = ship
            }
        } else {
            for (let i = 0; i < ship.size; i++) {
                this.board[x + i][y].ship = ship
            }
        }
        this.ships.push(ship)
        return true
    }

    checkPlacementValid(ship, x, y) {
        if (ship.isVertical) 
        {
            if (this.getShipOnSquare(x, y - 1) !== null ||
                this.getShipOnSquare(x + 1, y - 1) !== null ||
                this.getShipOnSquare(x - 1, y - 1) !== null ||
                this.getShipOnSquare(x, y + 1 + ship.size ) !== null ||
                this.getShipOnSquare(x + 1, y + 1 + ship.size ) !== null ||
                this.getShipOnSquare(x - 1, y + 1 + ship.size ) !== null) 
            {
   
                return false
            }
            
            for (let i = 0; i < ship.size; i++) {
                if (this.getShipOnSquare(x, y + i) !== null ||
                    this.getShipOnSquare(x + 1, y + i) !== null ||
                    this.getShipOnSquare(x - 1, y + i) !== null) {
                    return false
                }
            }
        } 
        else 
        {
            if (this.getShipOnSquare(x - 1, y) !== null ||
                this.getShipOnSquare(x - 1, y + 1) !== null ||
                this.getShipOnSquare(x - 1, y - 1) !== null ||
                this.getShipOnSquare(x + 1 + ship.size, y) !== null ||
                this.getShipOnSquare(x + 1 + ship.size, y + 1) !== null ||
                this.getShipOnSquare(x + 1 + ship.size, y - 1) !== null) 
            {              
                return false
            }
            
            for (let i = 0; i < ship.size; i++) {
                if (this.getShipOnSquare(x + i, y) !== null ||
                    this.getShipOnSquare(x + i, y + 1) !== null ||
                    this.getShipOnSquare(x + i, y - 1) !== null) {
                    return false
                }
            }
        }
    }

    getShipOnSquare(x, y) {
        if (x < 0 || y < 0 || x > 9 || y > 9) {
            return null
        }
        return this.board[x][y].ship
    }

    getSquare(x, y) {
        if (x < 0 || y < 0 || x > 9 || y > 9) {
            return null
        }
        return this.board[x][y]
    }

    getAllSquares() {
        return this.board
    }

    getAllShips() {
        return this.ships
    }

    receiveAttack(x, y) {
        if (this.getSquare(x,y).isHit) {
            return false
        }
        this.board[x][y].isHit = true

        if (this.board[x][y].ship) {
            this.board[x][y].ship.hit()
            return true
        }
        return false
    }

    removeShip(ship) {
        this.ships = this.ships.filter(s => s !== ship)
    }
}
