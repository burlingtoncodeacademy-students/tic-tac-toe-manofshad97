/*Use dom queries to gain access to the start button, reset button, board, status(which states whos turn it is), alertpop(which is mainly for the empty cell alert but also used to state who wins), and timer text elements */
let startButton = document.getElementById("startButt")
let resetButton = document.getElementById("resetButt")
let board = document.getElementById("board")
let status = document.getElementById("status")
let alertPop = document.getElementById("alertPop")
let timerText = document.getElementById("timer")

//Create count and paused variables for the timer function
let count = 0
let paused = true

//Create a processing variable which will be used during a setTimeout later in the cellClicked function. Initialize it to false
let processing = false

//Get an HTML collection of the 9 divs inside the original "board" div
let boardCells = board.children
//Turn that HTML collection into an array so we can easily loop through the individual cells
let boardCellsArray = [...boardCells]


function checkWinner() {
    //Get an array of all textContent of the cells and set it to a variable "cells". This will be used for the win conditionals later on.
    let cells = boardCellsArray.map((cell) => cell.textContent)
    let winner;

    //Win Conditionals
    //Use three specific indices in the cells array to represent individual rows, columns, and diagonals
    //If there are three equal cells in a row, column, or diagonal, grab the value of one of the cells and assign it to winner. Wiiner can be set any of the cells in that specific row/column/diagonal since the value of the cells would all be equal anyway
    //Make sure that the cells do not contain empty strings because three cells can technically be equal if they all contain empty strings
    if (cells[0] !== "" && cells[0] === cells[1] && cells[0] === cells[2]) {
        winner = cells[0]
        //WinningCells represents an array of the first row
        let winningCells = [0, 1, 2]
        //Since three cells in a row, column or diagonal are equal, loop through winningCells and fill the corresponding cells(using cellFill function) in boardCellsArray to show that someone won
        winningCells.forEach(cell => cellFill(boardCellsArray[cell]))
    }
    else if (cells[3] !== "" && cells[3] === cells[4] && cells[3] === cells[5]) {
        winner = cells[3]
        //WinningCells represents an array of the second row
        let winningCells = [3, 4, 5]
        winningCells.forEach(cell => cellFill(boardCellsArray[cell]))
    }
    else if (cells[6] !== "" && cells[6] === cells[7] && cells[6] === cells[8]) {
        winner = cells[6]
        //WinningCells represents an array of the third row
        let winningCells = [6, 7, 8]
        winningCells.forEach(cell => cellFill(boardCellsArray[cell]))
    }

    else if (cells[0] !== "" && cells[0] === cells[3] && cells[0] === cells[6]) {
        winner = cells[0]
        //WinningCells represents an array of the first column
        let winningCells = [0, 3, 6]
        winningCells.forEach(cell => cellFill(boardCellsArray[cell]))
    }

    else if (cells[1] !== "" && cells[1] === cells[4] && cells[1] === cells[7]) {
        winner = cells[1]
        //WinningCells represents an array of the second column
        let winningCells = [1, 4, 7]
        winningCells.forEach(cell => cellFill(boardCellsArray[cell]))
    }

    else if (cells[2] !== "" && cells[2] === cells[5] && cells[2] === cells[8]) {
        winner = cells[2]
        //WinningCells represents an array of the third column
        let winningCells = [2, 5, 8]
        winningCells.forEach(cell => cellFill(boardCellsArray[cell]))
    }

    else if (cells[0] !== "" && cells[0] === cells[4] && cells[0] === cells[8]) {
        winner = cells[0]
        //WinningCells represents an array of the first diagonal
        let winningCells = [0, 4, 8]
        winningCells.forEach(cell => cellFill(boardCellsArray[cell]))
    }

    else if (cells[2] !== "" && cells[2] === cells[4] && cells[2] === cells[6]) {
        winner = cells[2]
        //WinningCells represents an array of the second diagonal
        let winningCells = [2, 4, 6]
        winningCells.forEach(cell => cellFill(boardCellsArray[cell]))
    }

    //If the find function can't find an empty string(ie cell with an empty string) then it will return undefined
    //If the function does find an empty string, then it will return that empty string
    //If the find function returns undefined, then we know the table is full and it's a tie
    //Pause the timer again by setting pause to true
    else if (cells.find((cell) => cell === "") === undefined) {
        alertPop.textContent = `It's a tie!`
        paused = true
        status.textContent = ""
        //Make sure the board can't be clicked again after a tie (unless reset is clicked)
        boardCellsArray.forEach((cell) => cell.removeEventListener("click", cellClicked))
        return null;
    }
    //If winner variable is not undefined, state which player won based on current winner. Pause the timer and update textContent of status so it doesn't still show a player's turn
    if (winner) {
        alertPop.textContent = `${winner === "X" ? "Human" : "Computer"} wins!`
        paused = true
        status.textContent = ""
        //Make sure the board can't be clicked again after a win (unless reset is clicked)
        boardCellsArray.forEach((cell) => cell.removeEventListener("click", cellClicked))
    }
    return winner;
}

function cellClicked(evt) {
    //Initialize a variable "cell" to be the target that was clicked during the eventlistener
    let cell = evt.target
    //If processing is true, it means the computer is choosing its move so exit the function so that nothing can be clicked during that time
    if (processing) {
        return;
    }
    //If the cell already has a value and is clicked, update the textContent of alertPop to prompt user to select an empty cell
    if (cell.textContent.includes("X") || cell.textContent.includes("O")) {
        alertPop.textContent = "Please select an empty cell!"
        return;
    }
    //The human's textContent will always be "X" and the human always goes first
    cell.textContent = "X"
    status.textContent = `Human's turn`
    alertPop.textContent = ""
    //Check for a winner each time a cell is clicked and a value is drawn in that cell and set this to a variable "winner"
    let winner = checkWinner()
    //If there is no winner yet
    if (!winner) {
        //Get an array of all empty cells by filtering with cells that contain an empty string
        let emptyCells = boardCellsArray.filter((cell) => cell.textContent === "")
        //If there are no more empty cells, exit the function
        if (emptyCells.length === 0) {
            return;
        }
        //Choose a random cell from the empty cells array
        let randCell = Math.floor(Math.random() * emptyCells.length)
        //Set processing to true since the computer will now make its move
        processing = true
        status.textContent = "Computer's turn"
        //Create setTimeout to have a slight delay between the humans turn and computers turn
        setTimeout(() => {
            //Use the randCell variable from earlier to have the computer place an O in a random empty cell
            emptyCells[randCell].textContent = "O"
            //Change processing to false since the computer's turn is complete and update the status to Human's turn. Check for a winner again since a cell was clicked and drawn in
            processing = false
            status.textContent = "Human's turn"
            winner = checkWinner()
        }, 300)
    }
}
//Cellfill function that makes the background color of a cell white
function cellFill(cell) {
    cell.style.backgroundColor = "white"
}

//Use to empty all cells during reset. Remove textcontent and make background color transparent. Remove clicking event listener from a cell.
function emptyCell(cell) {
    cell.style.backgroundColor = "transparent"
    cell.textContent = ""
    cell.removeEventListener("click", cellClicked)
}

function start() {
    //Once the start button is clicked, it is disabled until the game ends or the reset button is clicked. Reset immediately becomes enabled after start is clicked.
    startButton.addEventListener("click", (evt) => {
        startButton.disabled = true
        resetButton.disabled = false
        //Human always starts first
        status.textContent = `Human's turn`
        //Loop through the boardCellsArray and wait for clicks on each cell
        boardCellsArray.forEach((cell) => {
            cell.addEventListener("click", cellClicked)
        })
        //Start the timer by setting paused to false
        paused = false
    })

    //Once the reset button is clicked, make start enabled and reset button disabled. Loop through boardCellsArray and call the emptyCell function on each cell. Set count to 0, pause the timer and make all other text (Who wins, whos turn it is) an empty string. Reset the timer's text content to 0:00
    resetButton.addEventListener("click", (evt) => {
        startButton.disabled = false
        resetButton.disabled = true
        boardCellsArray.forEach(emptyCell)
        alertPop.textContent = ""
        status.textContent = ""
        count = 0
        paused = true
        timerText.textContent = "Time elapsed: 00:00:00"
    })
}

//Timer function using setInterval
function timer() {
    //Takes an increment function and 1000 milliseconds. This means the timer will call the increment function every 1000 milliseconds, or every second
    setInterval(increment, 1000)

    function increment() {
        //If paused variable is true, stop the timer by exiting the function
        if (paused) {
            return;
        }
        //Convert count variable to milliseconds. Create a Date object with that timestamp and convert that object into a string using .toISOString(). Take the hours, minutes, and seconds out of that formatted string using .substr() (This works like slice but is for strings rather than arrays)
        timerText.textContent = "Time elapsed: " + new Date(count * 1000).toISOString().substr(11, 8)
        //Increment count
        count++
    }

}

start()
timer()

