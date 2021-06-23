# Tic Tac Toe



* A landing page that will link to the other two pages
* A page for playing a single player tic tac toe game against the computer
* A page for playing a multiplayer tic tac toe game with another human

If you are in the third week of the Web Dev bootcamp only focus on building the boards, and laying out the pages. We will be building out the functionality for the tic tac toe game as the project for week 4 after we cover DOM scripting

# Week 3 Project - Laying out the Board

The goal for this project is to become more familiar with HTML, and CSS by designing a website for playing tic tac toe that consists of 3 pages:

* A landing page allowing you to go to either the "Multi Player" or "Single Player" pages
* A "Single Player" page, containing a header, tic tac toe board, and footer
* A "Multi Player" page, containing a header, tic tac toe board, and footer

Page Elements

* Every page should have an identical header, containing a title for your game
  * Clicking the title on any page should bring you to the "Landing Page"

* On the landing page there should be two images centered on the page
  * clicking the right-hand image should take you to the "Single Player" page
  * clicking the left-hand image should take you to the "Multi Player" page
  * Each image should also have a smaller title telling you which page they link to

* On both the Single Player and Multi Player pages there should be:
  * a navigation bar that links to the other pages
  * a footer with contact, and copywrite information (it's okay to use fake info for this)
  * a 3x3 Tic Tac Toe board that is centered on the page
  * 3 buttons directly below the tic tac to board, and also centered on the page
    * Start, which should be enabled
    * Reset, Which should be disabled
    * Replay, which should be disabled

For the Week 3 submission the board and buttons do not need to do anything, we will be building the functionality for the Week 4 project.

# Week 4 - Building the Game Logic

For the week 4 project we will be building out the functionality that will transform our mocked out website into a fully functional tic tac toe game.

## Start Game

**Given** an empty board on the "Multi Player" page

**When** the user clicks 'Start Game'

**Then** the 'Start Game' button is disabled ("grayed out")

**And** the status area contains "Player X's turn"


## No Rules

**Given** an empty board, and the current player is X

**When** the user selects a cell

**Then** the board redraws

**And** an X appears in that cell, and the turn ends

**And** the current player changes from X to O

<hr/>

**Given** the player is O

**When** the user selects a cell

**Then** an O appears in that cell

**And** the turn ends, and the current player changes from O to X


## Rules

**When** the user selects a cell that is not empty

**Then** the game says "Please select an empty cell." and does not put an X or O in the cell

**And** the current player does not change


## Win Condition

**Given** the turn has just ended

**When** if there are three Xs in a row, column, or diagonal

**Then** the system draws a line through the winning three cells

**And** the app says "Congratulations! Player X wins!"

**And** the game ends

(and likewise for Player O)


## Names

**Given** a new game

**When** starting a game

**Then** allow the user(s) to choose the names of the players (not just X and O).

## Game Time

**Given** a new game

**When** the game is started

**Then** the timer should show the time in the format:
- `Time Elapsed XX seconds`

**And** every second during game play, until a player has won, the clock should proceed by one second.

Example:
- 32 seconds
- 33 seconds
- 34 seconds

```
Tic Tac Toe

   | X | O
--- --- ---
   | O |  
--- --- ---
   | X |  

Player O's turn

Time Elapsed 32 seconds
```


## Artificial Stupidity

**Given** an empty board on the "Single Player" page

**When** The start button is clicked

**Then** the game starts, and operates as the multi player game does with the following modifications:

- Do not ask for the player's name
- The human is always X and the computer is always O
- The computer player always picks an empty cell *at random*

# Icebox

## Game Time Formatted

After starting a game, a game clock timer is present in the lower region of the web page.

The timer should show the time in the format:
- Hours : Minutes : Seconds
- HH:MM:SS

(See example below)

Every second during game play, until a player has won, the clock should proceed by one second, incrementing the minutes, and hours as necessary.

Example:
- 00:59:57
- 00:59:58
- 00:59:59
- 01:00:00
- 01:00:01

```
Tic Tac Toe

   | X | O
--- --- ---
   | O |  
--- --- ---
   | X |  

Player O's turn

Time Elapsed 00:01:25
```

## Artificial Intelligence

- Instead of picking a random cell, the AI chooses the *best* random cell
- This will require R&D
- See <https://www.youtube.com/watch?v=P2TcQ3h0ipQ> for inspiration


## EXTRA SUPER BONUS: Play Nine Games at Once

- Change the rules of the game so that nine 3x3 boards are played at once by two players.
- A win can be achieved on any of the nine boards by placing three X's or three O's in a row.
- Winning on any board will award the player a win for the entire game.
- See this description for more information: http://www.stratigery.com/gen9.html
- **This story is not required to receive a 4 for functionality**
  - It is very, very hard...

![tic-tac-toe-9x9](https://github.com/BurlingtonCodeAcademy/codelikethis/blob/master/public/images/tic-tac-toe-9x9.png)