import tornado from "./tornado.png"
import "./style.css"
import log from './log.js'
import { Player } from "./game/player.js"
import { generateRandomCoordinates, playerTurn, computerTurn } from "./game/game.js"


const img = document.getElementById('tornado')
img.src = tornado
let controller = new AbortController()
let signal = controller.signal

const startButton = document.getElementById('start')
const arrangeButton = document.getElementById('arrange')
const captions = document.getElementsByClassName('player-name')
const boards = document.getElementsByClassName('board')
const wonText = document.getElementById('won')

console.log(wonText)
console.log(won[0])

let player = null
let cpuPlayer = null
let targetCoordinates = null
let isGameOver = false

arrangeButton.addEventListener('click', () => {
    boards[1].style.visibility = "hidden"
})


startButton.addEventListener('click', () => {
    boards[1].style.visibility = "visible"

    init()
    player = new Player("PLAYER")
    cpuPlayer = new Player("COMPUTER")
    targetCoordinates = generateRandomCoordinates()
    player.startGame()
    cpuPlayer.startGame()

    captions[0].textContent = player.name
    captions[1].textContent = cpuPlayer.name

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (player.gameboard.board[i][j].ship) {
                boards[0].rows.item(i).cells.item(j).className = "ship"
            }
            if (cpuPlayer.gameboard.board[i][j].ship) {
                boards[1].rows.item(i).cells.item(j).className = "ship"
            }

            boards[1].rows.item(i).cells.item(j).addEventListener('click', 
                async function clickSquare(e) {
                    e.target.removeEventListener('click', clickSquare);
                    console.log(e.target)
                    if (playerTurn(player, cpuPlayer, i, j))
                    {
                        e.target.className = "hit-ship"
                        gameOver(player, cpuPlayer)
                    }
                    else
                    {
                        e.target.className = "hit-empty"
                    }
                    await setTimeout(() => {
                        if (isGameOver) return
                        let pos = computerTurn(player, cpuPlayer, targetCoordinates)
                        if (player.gameboard.board[pos[0]][pos[1]].ship)
                        {
                            boards[0].rows.item(pos[0]).cells.item(pos[1]).className = "hit-ship"
                            gameOver(cpuPlayer, player)
                        }
                        else
                        {
                            boards[0].rows.item(pos[0]).cells.item(pos[1]).className = "hit-empty"
                        }
                    }, 100)
                }, { signal })

        }
    }

})

function gameOver(shooter, target) {
    if (target.gameboard.getAllShips().length === 0)
    {
        isGameOver = true
        console.log(`${shooter.name} won!`)
        wonText.style.visibility = "visible"
        wonText.textContent = `${shooter.name} WON!`

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                boards[0].rows.item(i).cells.item(j).className = ""
                boards[1].rows.item(i).cells.item(j).className = ""
            }
        }

        player = null
        cpuPlayer = null
        targetCoordinates = null
        controller.abort()
        controller = new AbortController()
        signal = controller.signal
    }

}


function init() {
    isGameOver = false

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            boards[0].rows.item(i).cells.item(j).className = ""
            boards[1].rows.item(i).cells.item(j).className = ""
        }
    }

    player = null
    cpuPlayer = null
    targetCoordinates = null
    controller.abort()
    controller = new AbortController()
    signal = controller.signal
    wonText.style.visibility = "hidden"

}



