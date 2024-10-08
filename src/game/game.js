import {Player} from '../player.js'  

let ships = [{name: 'Carrier', size:5}, {name: 'Battleship', size:4}, {name: 'Cruiser', size:3}, {name: 'Submarine',size:3}, {name: 'Destroyer', size:2}]
let startPos = [[0,0], [0,1], [0,2], [0,3], [0,4]]

let isGameOver = false


function attackPosition(player, target, x, y) {
    let gameboard = target.gameboard
    let result = false
    if (gameboard.receiveAttack(x,y)) { 
        result = true
        let ship = gameboard.getShipOnSquare(x,y)
        // console.log(`${ship.name} is hit`)
        console.log('\x1b[36m%s\x1b[0m',`${player.name} hits ${target.name}'s ${ship.name} at (${x},${y}) coordinates.`)
        if (ship.isSunk())
        {
            gameboard.removeShip(ship)
            console.log("sadfasdfasdf " + gameboard.getAllShips().length)
            console.log(`${ship.name} is sunk`)
            console.log(gameboard.getAllShips().length)
            if (gameboard.getAllShips().length === 0) {
                console.log(`${player.name} won!`)
                isGameOver = true
            }
        }
    }
    else {
        console.log('\x1b[31m%s\x1b[0m',`${player.name} hits (${x},${y}) coordinates and misses.`)
    }

    return result
}

export function generateRandomCoordinates() {
    const coordinates = [];
    const used = new Set();
  
    while (coordinates.length < 10 * 10) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const key = `${x},${y}`;
  
      if (!used.has(key)) {
        coordinates.push([x, y]);
        used.add(key);
      }
    }
  
    return coordinates;
  }

export function computerTurn(player, cpuPlayer, coordinates) {
    let targetPosition = coordinates.pop()
    console.log(targetPosition[0], targetPosition[1])
    attackPosition(cpuPlayer, player, targetPosition[0], targetPosition[1])
    return targetPosition
}

export function playerTurn(player, cpuPlayer, x, y) { 
    return attackPosition(player, cpuPlayer, x, y)
}


// let player = new Player("PLAYER")
// player.startGame()

// let cpuPlayer = new Player("COMPUTER")
// cpuPlayer.startGame()



// while (!isGameOver) {
//     computerTurn(targetCoordinates)
// }



