import {Gameboard} from './gameboard.js'
import {Battleship} from './battleship.js'

let ships = [{name: 'Carrier', size:5}, {name: 'Battleship', size:4}, {name: 'Cruiser', size:3}, {name: 'Submarine',size:3}, {name: 'Destroyer', size:2}]
let startPos = [[0,0], [0,1], [0,2], [0,3], [0,4]]

const gameBoard = new Gameboard()


for (let i = 0; i < 5; i++) {
    let ship = new Battleship(ships[i].name, ships[i].size)
    gameBoard.placeShip(ship, startPos[i][0], startPos[i][1])
}


gameBoard.getAllShips().forEach((ship) => {
    console.log(ship)
})

gameBoard.getAllSquares().forEach((square) => {
    console.log(square)
})

console.log(gameBoard.getShipOnSquare(0,0).health)
console.log(gameBoard.receiveAttack(0,0))
console.log(gameBoard.receiveAttack(0,0))
console.log(gameBoard.getShipOnSquare(0,0).health)


console.log(gameBoard.placeShip(new Battleship('Carrier', 5, true), 6, 0))