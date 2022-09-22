'use strict'

var LIFE = 3
var elH3 = document.querySelector('h3') //TO DO: need to put the number on the DOM

var board = []

var rows = 8
var columns = 8

var minesCount = 2
var minesLocation = []

var cellWithotBomb = 0
var canPutFlag = false
var gameOver = false

function buildBoard(value) {  //TO DO: bug if board is not 8X8

rows = value
columns = value

    for (var i = 0; i < rows; i++) {
        var mat = [];
        for (var j = 0; j < columns; j++) {

            var elCell = document.createElement("div"); // <div> </div>

            elCell.id = i.toString() + "-" + j.toString();  // <div> indxi-indxj </div>
            elCell.addEventListener("click", cellClicked);
            document.getElementById("board").append(elCell); // insert to Dom
            mat.push(elCell);
        }
        board.push(mat);
    }

    console.log("elCell", elCell)
    console.log("mat", mat)
    console.log("board", board)

    setMines();

    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
}


function setMines(Mines) { //TO DO:  should get the number from player difficult choise
    minesLocation.push("1-1")
    minesLocation.push("2-2")

    // TO DO : dosen't work...

    //     var numOfMines = minesCount                 
    //     while (numOfMines>0) {

    // var IdxI = Math.floor(math.random() * rows )
    // var IdxJ = math.floor(math.random() *columns ) 
    // var id = IdxI.toString() + "-" + IdxJ.toString()

    // if(!minesLocation.includes(id)) {

    // minesLocation.push(id)
    // numOfMines -=1

    // }
    //     }

}

function setFlag() {
    if (canPutFlag) {
        canPutFlag = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
    else {
        canPutFlag = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    }
}

function cellClicked() {
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }

    var cell = this // the cell that was clicked
    if (canPutFlag) {
        if (cell.innerText === "") {
            cell.innerText = "🚩"
        }
        else if (cell.innerText === "🚩") {
            cell.innerText = ""
        }
        return;
    }

    if (minesLocation.includes(cell.id)) {

        alert(LIFE);

        if (LIFE === 0) {

            var elH2 = document.querySelector('h2')
            elH2.innerText = 'Try again ? 🤯'
            const elBtn = document.querySelector('.start-btn')
            elBtn.classList.remove('hide')
            gameOver = true
            revealMines()
            runEndProcedure() // still thinking about it 

            return
        }
        else {
            LIFE = --LIFE
            return
        }

    }


    var Idx = cell.id.split("-")
    var i = parseInt(Idx[0])
    var j = parseInt(Idx[1])
    checkCell(i, j)

}

function revealMines() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            var cell = board[i][j]
            if (minesLocation.includes(cell.id)) {
                cell.innerText = "💣"
                cell.style.backgroundColor = "red"
            }
        }
    }
}

function checkCell(i, j) {
    if (i < 0 || i >= rows || j < 0 || j >= columns) {
        return;
    }
    if (board[i][j].classList.contains("tile-clicked")) {
        return;
    }

    board[i][j].classList.add("tile-clicked")
    cellWithotBomb += 1

    var minesFound = 0


    minesFound += checkMine(i - 1, j - 1)
    minesFound += checkMine(i - 1, j)
    minesFound += checkMine(i - 1, j + 1)
    minesFound += checkMine(i, j - 1)
    minesFound += checkMine(i, j + 1)
    minesFound += checkMine(i + 1, j - 1)
    minesFound += checkMine(i + 1, j)
    minesFound += checkMine(i + 1, j + 1)

    if (minesFound > 0) {
        board[i][j].innerText = minesFound
        board[i][j].classList.add("x" + minesFound.toString())
    }
    else {

        checkCell(i - 1, j - 1)
        checkCell(i - 1, j)
        checkCell(i - 1, j + 1)
        checkCell(i, j - 1)
        checkCell(i, j + 1)
        checkCell(i + 1, j - 1)
        checkCell(i + 1, j)
        checkCell(i + 1, j + 1)

        console.log("i", i, "j", j)
    }

    if (cellWithotBomb === rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared"
        var elH2 = document.querySelector('h2')
        elH2.innerText = 'You Win  😎'
        const elBtn = document.querySelector('.start-btn')
        elBtn.classList.remove('hide')
        gameOver = true
        runEndProcedure()
    }
    function runEndProcedure() {

    }
}

function checkMine(i, j) {
    if (i < 0 || i >= rows || j < 0 || j >= columns) {
        return 0
    }
    if (minesLocation.includes(i.toString() + "-" + j.toString())) {
        return 1
    }
    return 0

}

function runEndProcedure() { // Dosen't work

    var elBtn = document.querySelector('"start-btn hide"')
    elBtn.innerText = (!gameOver) ? 'You Won! Play Again?' : 'You Lost! Play Again?'


}
