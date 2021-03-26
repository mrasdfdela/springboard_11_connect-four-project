/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

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
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  //create table-data elements for top row of board according to WIDTH of board 
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // DONE: add comment for this code
  // create rows of table-data elements according to WIDTH and HEIGHT of board
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
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
  for (var y = HEIGHT - 1; y >= 0; y--) {
    cell = document.getElementById(`${y}-${x}`);
    if (cell.children.length === 0) {
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

function endGame(msg) {
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
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // DONE: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // DONE: check if all cells in board are filled; if so call, call endGame
  gamePieces = document.querySelectorAll('#board div')
  if (gamePieces.length === WIDTH * HEIGHT) endGame('Draw!');

  // switch players
  // DONE: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  // Check four cells to see if they're all color of current player
  function _win(cells) {
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
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // coordinates going up and to the right
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // coordinates going diagonol right and diagonol left
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      //test if any of the 4 sets of coordinates belong to the current player (that made the last move)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(HEIGHT, WIDTH);
makeHtmlBoard();