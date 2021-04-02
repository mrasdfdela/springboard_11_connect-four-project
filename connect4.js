/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard(rows,columns) {
  board = [...Array(rows)].map( () => 
    Array(columns).fill(null)
  );
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // DONE: get "htmlBoard" variable from the item in HTML w/ID of "board"
  htmlBoard = document.querySelector('#board')
  // DONE: add comment for this code
  // create (parent) table-row element for top of board w/ id and event listener 
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top"); // ### TA NOTE: WOULD RATHER HAVE USED A CLASS (USUALLY RESERVED FOR VERY SPECIFIC ACTIONS) HELPS FOR FUTURE FLEXIBILITY, RATHER CALLED TOP-ROW TO BE MORE DESCRIPTIVE
  top.addEventListener("click", handleClick);
  //create table-data elements for top row of board according to WIDTH of board 
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // DONE: add comment for this code
  // create rows of table-data elements according to WIDTH and HEIGHT of board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // DONE: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    cell = document.getElementById(`${y}-${x}`);
    if (cell.children.length === 0) { // ### TA NOTE: USING THE DOM IS NOT OPTIMAL BECAUSE IT IS MIXING CONCERNS; RATHER LOOK FOR ITEMS IN THE BOARD ARRAY
      return y;
    } 
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // DONE: make a div and insert into correct table cell
  playerClass = `p${currPlayer}`

  gamePiece = document.createElement('div');
  gamePiece.classList.add('piece', playerClass);
  cell.append(gamePiece);
}

/** endGame: announce game end */

function endGame(msg) { // ### TA NOTE: RENAME SHOWMESSAGE TO BE MORE ACCURATE; THIS TECHNICALLY DOESN'T END THE GAME
  // TODO: pop up alert message
  setTimeout(() => {
    if (msg) {
      alert(msg);
    } else {
      alert(`Player ${currPlayer} has won!`);
    }
  }, 10);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // DONE: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer; //  ### TA NOTE: SWITCH WITH PREVIOUS LINE; YOU'D RATHER CHANGE THE UNDERLYING DATA BEFORE UPDATING THE UI

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // DONE: check if all cells in board are filled; if so call, call endGame
  gamePieces = document.querySelectorAll("#board div");
  if (gamePieces.length === WIDTH * HEIGHT) endGame("Draw!"); // ### TA NOTE:  BOARD ARRAY RATHER THAN DOM FOR COUNT

  // switch players
  // DONE: switch currPlayer 1 <-> 2
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1); // ### TA NOTE: DON'T NEED TO TYPE OUT CURRPLAYER AGAIN
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  // Check four cells to see if they're all color of current player
  function _win(cells) { // ### TA NOTE: INTRO TO OBJ-ORIENTED PROGRAMMING; IT GROUPS FUNCTIONS TOGETHER TO HELP ESTABLISH THEIR CONTEXT
    // - cells: list of four coordinates (y, x) of cells
    
    return cells.every(
      ([y, x]) =>
      //  - returns true if all are legal coordinates & all match currPlayer
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // DONE: read and understand this code. Add comments to help you.

  // scan through board; for each coordinate, create a set of 4 coordinates corresponding to winning scenarios
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // coordinates going up and to the right
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // coordinates going diagonol right and diagonol left
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      //test if any of the 4 sets of coordinates belong to the current player (that made the last move)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(HEIGHT, WIDTH);
makeHtmlBoard();