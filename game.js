
var LIFE = 3
var elH3 = document.querySelector('h3')

var gBoard = {
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}


gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function buildBoard() {
    var size = gLevel.SIZE

}

var board = []
var rows = 8
var columns = 8

    var minesCount = 2
    var minesLocation = []
    
    var tilesClicked = 0 
    var flagEnabled = false
    var gameOver = false
    
    window.onload = function () {
        buildBoard()
    }
    
    function buildBoard() {
        
        //@@@@@@@@@@@@@@@@ cath the buttom and when i call the function it should reload the page @@@@@@@@@@@
        
        // const elBtns = document.querySelector("start-btn hide")
        // strHTML += `<button class="opt" onclick="checkAnswer(${i})">${opts[i]}</button>\n`
        // elBtns.innerHTML = strHTML
        
        document.getElementById("mines-count").innerText = minesCount;
        document.getElementById("flag-button").addEventListener("click", setFlag);
        setMines();
        
        
        for (var i = 0; i < rows; i++) {
            var mat = [];
            for (var j = 0; j < columns; j++) {
               
                var elCell = document.createElement("div");
                elCell.id = i.toString() + "-" + j.toString();
                elCell.addEventListener("click", cellClicked);
                document.getElementById("board").append(elCell);
                mat.push(elCell);
            }
            board.push(mat);
        }
        
        console.log(board);
    }


    function setMines() {
         minesLocation.push("1-1")
        minesLocation.push("2-2")

        // make get random number after i will finish the basic
    
    
}
    
    function setFlag() {
        if (flagEnabled) {
            flagEnabled = false;
            document.getElementById("flag-button").style.backgroundColor = "lightgray";
        }
        else {
            flagEnabled = true;
            document.getElementById("flag-button").style.backgroundColor = "darkgray";
        }
    }
    
    function cellClicked() {
        if (gameOver || this.classList.contains("tile-clicked")) {
            return;
        }
        
        var cell = this;
        if (flagEnabled) {
            if (cell.innerText == "") {
                cell.innerText = "🚩"
            }
            else if (cell.innerText == "🚩") {
                cell.innerText = ""
            }
            return;
        }
        
        if (minesLocation.includes(cell.id)) {
            
            alert(LIFE);
            
            if(LIFE === 0 ){
                
                var elH2 = document.querySelector('h2')
                elH2.innerText = 'Try again ? 🤯'
                const elBtn = document.querySelector('.start-btn')
                elBtn.classList.remove('hide')
                gameOver = true
                revealMines()
                buildBoard()
                return
            }
            else{
                LIFE = --LIFE
                return
            }
            
        }
        
        
        var Idx = cell.id.split("-") 
        var i = parseInt(Idx[0])
        var j = parseInt(Idx[1])
        checkMine(i, j)
        
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
    

    
    
    function checkTile(i, j) {
        if (i < 0 || i >= rows || j < 0 || j >= columns) {
            return 0;
        }
        if (minesLocation.includes(i.toString() + "-" + j.toString())) {
            return 1
        }
        return 0
    }
    // function countActiveNegs(board, rowIdx, colIdx) {
    //     var count = 0
    //     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    //         if (i < 0 || i >= board.length) continue
    //         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
    //             if (i === rowIdx && j === colIdx) continue
    //             if (j < 0 || j >= board[0].length) continue
    //             var currCell = board[i][j]
    //             if (currCell.isActive) count++
    //         }
    //     }
    //     return count
    
    // }