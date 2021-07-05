/*Use dom queries to gain access to the start button, reset button, board, status(which states whos turn it is), alertpop(which is mainly for the empty cell alert but also used to state who wins), popupwrapper(wrapper for the popup that prompts users for names), nameinputs, and timer text elements */
let startButton = document.getElementById("startButt")
let resetButton = document.getElementById("resetButt")
let board = document.getElementById("board")
let status = document.getElementById("status")
let alertPop = document.getElementById("alertPop")
let popupWrapper = document.getElementById("popupWrapper")
let nameInput1 = document.getElementById("player1")
let nameInput2 = document.getElementById("player2")
let timerText = document.getElementById("timer")

//Create variables name1 and name2 to hold the value of the user input. Can be initialized to anything because they will be updated before the game begins.
let name1 = "X"
let name2 = "O"

//Create count and paused variables for the timer function
let count = 0
let paused = true

//Player variable keeps track of the current player. This variable is not needed in the singleplayer.js
let player = "X"

//Get an HTML collection of the 9 divs inside the original "board" div
let boardCells = board.children
//Turn that HTML collection into an array so we can easily loop through the individual cells
let boardCellsArray = [...boardCells]

//Turns the wrapper for the name prompt popup into a flexbox
function nameInput() {
    popupWrapper.style.display = "flex"
}

function submitNames() {
    //Reassign name1 and name2 to be the value of the userinput for the names 
    name1 = nameInput1.value
    name2 = nameInput2.value
    //Say who's turn it is based on the current player. If player is X, use name1. If player is O, use name2
    status.textContent = `Player ${player === "X" ? name1 : name2}'s turn`
    //Loop through the boardCellsArray and wait for clicks on each cell
    boardCellsArray.forEach((cell) => {
        cell.addEventListener("click", cellClicked)
    })
    //Make it so the popup is no longer visible after clicking "Submit"
    popupWrapper.style.display = "none"
    //Make sure to set paused to false so that the timer actually runs. Before adding this, the timer would not start because paused was set to true from a different function
    paused = false

}

function checkWinner() {
    //Get an array of all textContent of the cells and set it to a variable "cells". This will be used for the win conditionals later on.
    let cells = boardCellsArray.map((cell) => cell.textContent)

    //Initialize a winner variable to undefined
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
    else if (cells.find((cell) => cell === "" ) === undefined){
        alertPop.textContent = `It's a tie!`
        paused = true
        status.textContent = ""
        //Make sure the board can't be clicked again after a tie (unless reset is clicked)
        boardCellsArray.forEach((cell) => cell.removeEventListener("click", cellClicked))
        return null;
    }
    //If winner variable is not undefined, state which player won based on current winner. Pause the timer and update textContent of status so it doesn't still show a player's turn
    if (winner) {
        alertPop.textContent = `Player ${winner === "X" ? name1 : name2} wins!`
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
    //If the cell already has a value and is clicked, update the textContent of alertPop to prompt user to select an empty cell
    if (cell.textContent.includes("X") || cell.textContent.includes("O")) {
        alertPop.textContent = "Please select an empty cell!"
        return;
    }
    //If the current player is X, since they clicked an empty cell, put an X in that cell and then update the current player to O
    if (player === "X") {
        cell.textContent = "X"
        player = "O"
    }
    //If the current player is O, since they clicked an empty cell, put an O in that cell and then update the current player to X
    else if (player === "O") {
        cell.textContent = "O"
        player = "X"
    }
    //Continue to state which player's turn it is based on current player. Set the alert for choosing an empty cell to an empty string. Call checkWinner function to check for a winner each time a cell is clicked and a value is drawn in that cell
    status.textContent = `Player ${player === "X" ? name1 : name2}'s turn`
    alertPop.textContent = ""
    checkWinner()
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
    //Once the start button is clicked, it is disabled until the game ends or the reset button is clicked. Reset immediately becomes enabled after start is clicked. Call nameinput function to prompt user for names
    startButton.addEventListener("click", (evt) => {
        startButton.disabled = true
        resetButton.disabled = false
        nameInput()
    })
    //Once the reset button is clicked, make start enabled and reset button disabled. Loop through boardCellsArray and call the emptyCell function on each cell. Set count to 0, pause the timer and make all other text (Who wins, whos turn it is) an empty string. Reset the timer's text content to 0:00
    resetButton.addEventListener("click", (evt) => {
        startButton.disabled = false
        resetButton.disabled = true
        boardCellsArray.forEach(emptyCell)
        alertPop.textContent = ""
        status.textContent = ""
        player = "X"
        count = 0
        paused = true
        timerText.textContent = "Time elapsed: 0:00"
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
        timerText.textContent = new Date(count * 1000).toISOString().substr(11, 8)
        //Increment count
        count++
    }

}

start()
timer()

