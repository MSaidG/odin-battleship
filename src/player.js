import {Gameboard} from './game/gameboard.js'
import {Battleship} from './game/battleship.js'

export class Player {
    constructor(name = "PLAYER") {
        this.name = name
        this.gameboard = new Gameboard()
    }

    startGame() {
        let startPos = [[0,0], [0,1], [0,2], [0,3], [0,4]]

        let ships = [{name: 'Carrier', size:5}, {name: 'Battleship', size:4}, 
            {name: 'Cruiser', size:3}, {name: 'Submarine',size:3}, {name: 'Destroyer', size:2}]

        for (let i = 0; i < 5; i++) {
            let ship = new Battleship(ships[i].name, ships[i].size)
            this.gameboard.placeShip(ship, startPos[i][0], startPos[i][1])
        }
        
    }

    attackPosition(x, y) {
        this.gameboard.receiveAttack(x, y)
    }

    placeShip(ship, x, y) {
        this.gameboard.placeShip(ship, x, y)
    }


    
    
}