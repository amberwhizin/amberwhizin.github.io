$(() => {
  const yellow = "yellow";
  const red = "red";

  let redWon = false;
  let yellowWon = false;

  const column0 = [];
  const column1 = [];
  const column2 = [];
  const column3 = [];
  const column4 = [];
  const column5 = [];
  const column6 = [];
  let board = [column0, column1, column2, column3, column4, column5, column6];

  const resetBoard = () => {
    board = [[], [], [], [], [], [], []];
  };

  // if not player1 turn then player2
  // and returns player1 
  // siting myself here via tic-tac-toe project
  let isPlayer1 = false;
  const getIsPlayer1Turn = () => {
    isPlayer1 = !isPlayer1;
    return isPlayer1;
  };

  // returns red circles, if true is passed in then add a class yellow and return
  const generateCircle = (isYellow = false) => {
    const $circle = $("<div>").addClass("circle");
    if (isYellow) {
      $circle.addClass("yellow");
    }
    return $circle;
  };
// and append  the cells to place the tokens into 
  // invokes circles when screen clicked, switches between the two
  const makeCells = ($column, columnInfo) => {
    for (let i = 0; i < 6; i++) {
      const piece = columnInfo[i];
      const $cell = $("<div>")
        .addClass("cell")
        .addClass("cell" + i);

        // if the token is is yellow, it will run isYellow function
      if (piece === yellow) {
        const $circle = generateCircle(true);
        $cell.append($circle);
      }
      if (piece === red) {
        const $circle = generateCircle();
        $cell.append($circle);
      }
      if (piece === undefined) {
        const $circle = generateCircle().addClass("background-fill");
        $cell.append($circle);
      }
      $column.append($cell);
    }
  };
 // passing in the render loop index
 // and creates columns through the arrays above
  // creates columns with cells in them
  const generateColumn = (index) => {
    const currentColumnInfo = board[index];
 
    const onClick = () => {
      // every time you click clears who won, resetting reWOn and YellowWOn
      redWon = false;
      yellowWon = false;
      const $outputYellow = $(".results");
      $outputYellow.text("");
      // so the pieces dont go on forever
      if (currentColumnInfo.length >= 6) {
        return;
      }
      // depending on whose turn it is, i push the string red/yellow into my empty arrays above and render it 
      const isPlayer1 = getIsPlayer1Turn();
      if (isPlayer1) {
        currentColumnInfo.push(red);
      } else {
        currentColumnInfo.push(yellow);
      }
      render();

      // checking to see end game scenarios
      const horizontalBoard = changeToRow(board);
      winScenario(horizontalBoard);

      const diagonalLeftBoard = changeLeftDiagonal(board);
      winScenario(diagonalLeftBoard);

      // this was hard, but i was trying to reverse the board but it was mutating the original board which made a crazy light show
      const reverseBoard = board.slice().reverse();
      const diagonalRightBoard = changeLeftDiagonal(reverseBoard);
      winScenario(diagonalRightBoard);

      // winScenario takes an array of arrays and because of that works for all cases
      winScenario(board);
      // was easier to just check for undefined tokens with horizontal board - regular board doesn't keep track of the blank spaces
      tieScenario(horizontalBoard);
    };
    // draggable/droppable methods here drops/drags after each click and removes it from the corner space
    const $column = $("<div>")
      .addClass("column")
      .addClass(`column${index}`)
      .on("click", onClick);
    // here i take in my column div and the column arrays
    makeCells($column, currentColumnInfo); // holds info for my cells
    // cite https://jqueryui.com/droppable/
    $column.droppable({
      drop: (e, ui) => {
        const $circle = ui.draggable[0];
        $circle.remove();
        onClick();
      },
    });
    return $column;
  };

  //
  const tieScenario = (board) => {
    for (let i = 0; i < board.length; i++) {
      const column = board[i];

      for (let j = 0; j < column.length; j++) {
        const token = column[j];
        // if there are empty spaces left on the board its not a tie 
        if (token === undefined) {
          // not a tie breaks out of loop
          return;
        }
      }
    }
    // if all spaces are filled its a tie
    // if nobody won and alllll the spaces are fill its a tie
    if (!redWon && !yellowWon) {
      const $outputYellow = $(".results");
      $outputYellow.text("It's a tie!");
      resetBoard();
    }
    return;
  };

  //win logic
  const winScenario = (board) => {
    for (let i = 0; i < board.length; i++) {
      const column = board[i];

      let redsInARow = 0;
      let yellowsInARow = 0;

      for (let j = 0; j < column.length; j++) {
        const token = column[j];
        if (token === red) {
          ++redsInARow;
        } else {
          redsInARow = 0;
        }

        if (redsInARow === 4) {
          const $outputRed = $(".results");
          $outputRed.text("Red wins!");
          redWon = true;
          resetBoard();
          // yellows turn
        }
        if (token === yellow) {
          ++yellowsInARow;
        } else {
          // edge case
          yellowsInARow = 0;
        }

        if (yellowsInARow === 4) {
          const $outputYellow = $(".results");
          $outputYellow.text("Yellow wins!");
          yellowWon = true;
          resetBoard();
        }
      }
    }
  };
 // the render function loops 7 times to 
  // make multiple columns
  const render = () => {
    $(".wrapper").empty();
    $(".fixed-token").empty();
    for (let i = 0; i < 7; i++) {
      const $column = generateColumn(i);
      $(".wrapper").append($column);
    }

    // created piece the fixed piece to drag it using draggable() method
    const $cell = $("<div>").addClass("starter-cell");
    const $circle = generateCircle(isPlayer1);
    $circle.draggable();
    $cell.append($circle);
    $(".fixed-token").append($cell);
  };
  render();

  // if theres and element in column it will push the index into the  corresponding row array, the index is the row! found the pattern
  // vertical wins just neatly stack on top of one another, theres no spaces like in horizontal, where i had to add undefined to win in a row, it was having me win because nothing was separating the elements the array.
  //find row in column
  // citing https://medium.com/dev-genius/lets-rotate-a-matrix-clockwise-javascript-beginners-65a9c34aa0a6
 
  const changeToRow = (board) => {
    const row0 = [];
    const row1 = [];
    const row2 = [];
    const row3 = [];
    const row4 = [];
    const row5 = [];
    let boardRow = [row0, row1, row2, row3, row4, row5];
    for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
      const column = board[columnIndex];
      for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        const token = column[rowIndex];
        const row = boardRow[rowIndex];

        // also pushing undefined
        row.push(token);
      }
    }
    return boardRow;
  };

  // diagonal is different, it adds the column index and the row index together in finds the corresponding diagonal "row" 
  // i had to figure out the other direction of diagonal, which is if you flip the board around in your head its the same, so i used reverse method on a copy of the board itself to reverse the columns
  const changeLeftDiagonal = (board) => {
    const diagonal0 = [];
    const diagonal1 = [];
    const diagonal2 = [];
    const diagonal3 = [];
    const diagonal4 = [];
    const diagonal5 = [];
    const diagonal6 = [];
    const diagonal7 = [];
    const diagonal8 = [];
    const diagonal9 = [];
    const diagonal10 = [];
    const diagonal11 = [];
    const diagonal12 = [];

    let boardDiagonal = [
      diagonal0,
      diagonal1,
      diagonal2,
      diagonal3,
      diagonal4,
      diagonal5,
      diagonal6,
      diagonal7,
      diagonal8,
      diagonal9,
      diagonal10,
      diagonal11,
      diagonal12,
    ];
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
      const column = board[columnIndex];
      for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        const token = column[rowIndex];
        const diag = columnIndex + rowIndex;

        boardDiagonal[diag].push(token);
      }
    }

    return boardDiagonal;
  };
});
