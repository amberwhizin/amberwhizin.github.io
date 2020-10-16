$(() => {
  const yellow = "yellow";
  const red = "red";

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
  // siting myself here via tic-tac-toe project
  let isPlayer1 = false;
  const getIsPlayer1Turn = () => {
    isPlayer1 = !isPlayer1;
    return isPlayer1;
  };

  // returns red circles, if true is passed in then return yellow
  const generateCircle = (isYellow = false) => {
    const $circle = $("<div>").addClass("circle");
    if (isYellow) {
      $circle.addClass("yellow");
    }
    return $circle;
  };

  // invokes circles when screen clicked, switches between the two
  const makeCells = ($column, columnInfo) => {
    for (let i = 0; i < 6; i++) {
      const piece = columnInfo[i];
      const $cell = $("<div>")
        .addClass("cell")
        .addClass("cell" + i);

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

  // creates columns with cells in them
  const generateColumn = (index) => {
    const currentColumnInfo = board[index];
    const onClick = () => {
      //to do: fix this
      // if (currentColumnInfo.length >= 6) {
      //   return;
      // }
      const isPlayer1 = getIsPlayer1Turn();
      if (isPlayer1) {
        currentColumnInfo.push(red);
        // currentColumnInfo.shift();
      } else {
        currentColumnInfo.push(yellow);
        // currentColumnInfo.shift();
      }
      render();
      //
      const horizontalBoard = changeToRow(board);
      winScenario(horizontalBoard);

      const diagonalLeftBoard = changeLeftDiagonal(board);
      winScenario(diagonalLeftBoard);

      // this was hard, but i was trying to reverse the board but was mutating the original board which made a crazy light show
      const reverseBoard = board.slice().reverse();

      const diagonalRightBoard = changeLeftDiagonal(reverseBoard);
      console.log("diagonalRightBoard", diagonalRightBoard);
      console.log("diagonalLeftBoard", diagonalLeftBoard);
      winScenario(diagonalRightBoard);

      winScenario(board);
    };
    const $column = $("<div>")
      .addClass("column")
      .addClass(`column${index}`)
      .on("click", onClick);

    makeCells($column, currentColumnInfo); // holds info for my cells
    // cite https://jqueryui.com/droppable/
    $column.droppable({
      drop: (e, ui) => {
        console.log({ e, ui });
        const $circle = ui.draggable[0];
        $circle.remove();
        onClick();
      },
    });
    return $column;
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
        //console.log(redsInARow);
        if (redsInARow === 4) {
          const $outputRed = $(".results");
          $outputRed.text("Red wins!");
          resetBoard();
          // yellows turn
        }
        if (token === yellow) {
          ++yellowsInARow;
        } else {
          // edge case
          yellowsInARow = 0;
        }
        //console.log(yellowsInARow);
        if (yellowsInARow === 4) {
          const $outputYellow = $(".results");
          $outputYellow.text("Yellow wins!");
          resetBoard();
        }
      }
    }
  };

  // makes multiple columns
  const render = () => {
    $(".wrapper").empty();
    $(".fixed-token").empty();
    for (let i = 0; i < 7; i++) {
      const $column = generateColumn(i);
      $(".wrapper").append($column);
    }

    // creat piece
    const $cell = $("<div>").addClass("starter-cell");
    const $circle = generateCircle(isPlayer1);
    $circle.draggable();
    $cell.append($circle);
    $(".fixed-token").append($cell);
  };
  render();

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

        row.push(token);
      }
    }

    console.log({ boardRow, board });
    return boardRow;
  };

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
