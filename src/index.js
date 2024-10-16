import tornado from "./tornado.png"
import "./style.css"
import log from './log.js'
import { Player } from "./game/player.js"
import { generateRandomCoordinates, playerTurn, computerTurn } from "./game/game.js"
//CHECK THIS FOR SNAP TO GRID
 // https://gsap.com/community/forums/topic/11581-draggable-snap-to-grid-based-on-another-object/
const img = document.getElementById('tornado')
img.src = tornado
let controller = new AbortController()
let signal = controller.signal

const startButton = document.getElementById('start')
const arrangeButton = document.getElementById('arrange')
const captions = document.getElementsByClassName('player-name')
const boards = document.getElementsByClassName('board')
const wonText = document.getElementById('won')

let draggedElement = null
let ships = document.getElementsByClassName('ship')
const dropzone = document.getElementById('dropzone')

const dropTarget = document.getElementById("dropzone");
dropTarget.addEventListener('dragover', (event) => {
    console.log("dragover")
    event.preventDefault()
    dropzone.appendChild(draggedElement);
})

dropTarget.addEventListener('dragleave', (event) => {
    console.log("dragover")
    event.preventDefault()
    dropzone.removeChild(draggedElement);
})

dropTarget.addEventListener('drop', (e) => {
    console.log("drop")
    e.preventDefault();


    // move dragged element to the selected drop target
    if (e.target.className === "dropzone") {
      draggedElement.parentNode.removeChild(draggedElement);
      e.target.appendChild(draggedElement);
    }
})
let startX, startY;
let newX, newY;
let isDrag
for (let i = 0; i < ships.length; i++) {
    // ships[i].addEventListener('drag', (e) => {
    //     e.preventDefault()
    //     var rect = e.target.getBoundingClientRect();
    //     console.log(rect.top, rect.right, rect.bottom, rect.left);
    // })
    
    // ships[i].addEventListener('dragend', () => {
    //     console.log("dragend")
    // })
    
    // ships[i].addEventListener('dragstart', (e) => {
    //     console.log("dragstart")

    //     draggedElement = e.target
    //     e.dataTransfer.effectAllowed = "move";
    //     e.dataTransfer.dropEffect = "move";

    // })
    
    // ships[i].addEventListener('drop', () => {
    //     draggedElement = null
    //     isDrag = false

    // })

    ships[i].addEventListener('mousedown', (e) => {
        console.log("click")
        startX = e.clientX
        startY = e.clientY
        // e.preventDefault()
        console.log(i)
        document.addEventListener('mousemove', function(e) {
            mouseMove(e, i)
        })
        document.addEventListener('mouseup', mouseUp)

    })
}

console.log(ships[1].offsetLeft, ships[1].offsetTop)
console.log(ships[1].parentElement.dataset)
function mouseMove(e, i) {
    console.log(i)
    if (startX - e.clientX > 35 || startX - e.clientX < -35)
    {
        newX = startX - e.clientX
        if (newX < 0) // go right
        {
            let parent = ships[i].parentElement
            if (parent.dataset.x >= 9) return 
            parent.nextElementSibling.append(ships[i])
        }
        else if (newX > 0) // go left
        {
            let parent = ships[i].parentElement
            if (parent.dataset.x <= 0) return 
            parent.previousElementSibling.append(ships[i])
        }
        startX = e.clientX
        ships[i].style.left = ships[i].parentElement.offsetLeft + 4 + 'px'
    }

    if (startY - e.clientY > 32 || startY - e.clientY < -32)
    {

        newY = startY - e.clientY
        if (newY < 0) // go down
        {
            let x = parseInt(ships[i].parentElement.dataset.x)
            let y = parseInt(ships[i].parentElement.dataset.y)
            boards[0].rows.item(y+1).cells.item(x).append(ships[i])
        }
        else if (newY > 0) // go up
        {
            let parent = ships[i].parentElement
            parent.previousElementSibling.append(ships[i])
        }
        startY = e.clientY
        
        ships[i].style.top = ships[i].parentElement.offsetTop + 4 + 'px'

    }
}

function mouseUp(e) {
    document.removeEventListener('mousemove', mouseMove)
}

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        // boards[0].rows.item(i).cells.item(j).addEventListener('dragleave', (event) => {
        //     console.log("TD: dragleave")
        //     console.log(event.target.tagName)
        //     event.preventDefault()
        // })

        // boards[0].rows.item(i).cells.item(j).addEventListener('dragenter', (event) => {
        //     console.log("TD: dragenter")
        //     if (event.target.tagName === "DIV") {
        //         console.log("DIV: dragenter")
        //         boards[0].rows.item(i).cells.item(j).append(draggedElement);
        //     }
        // })

        // boards[0].rows.item(i).cells.item(j).addEventListener('dragover', (event) => {
        //     event.preventDefault()
        // })
        
        // boards[0].rows.item(i).cells.item(j).addEventListener('drop', (event) => {
        //     console.log("TD: drop")
        //     event.preventDefault();

        //     if (event.target.tagName === "TD") {
        //         event.target.appendChild(draggedElement);
        // }
        // })

            
    }
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


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



