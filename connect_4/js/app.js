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
    const $column = $("<div>")
      .addClass("column")
      .addClass(`column${index}`)
      .on("click", () => {
        if (currentColumnInfo.length >= 6) {
          return;
        }
        const isPlayer1 = getIsPlayer1Turn();
        if (isPlayer1) {
          currentColumnInfo.push(red);
        } else {
          currentColumnInfo.push(yellow);
        }
        render();
        const horizontalBoard = changeToRow(board);
        winScenario(horizontalBoard);

        //console.log(board);
        winScenario(board);
      });

    // console.log({ currentColumnInfo });
    makeCells($column, currentColumnInfo); // holds info for my cells
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
        } else if (token === yellow) {
          // edge case
          redsInARow = 0;
        }
        //console.log(redsInARow);
        if (redsInARow === 4) {
          console.log("Red wins!");
          board = [[], [], [], [], [], [], []];
          // yellows turn
        }
        if (token === yellow) {
          ++yellowsInARow;
        } else if (token === red) {
          // edge case
          yellowsInARow = 0;
        }
        //console.log(yellowsInARow);
        if (yellowsInARow === 4) {
          console.log("Yellow wins!");
          board = [[], [], [], [], [], [], []];
        }
        if (red === 4) {
        }
      }
    }
  };

  // makes multiple columns
  const render = () => {
    $(".wrapper").empty();
    for (let i = 0; i < 7; i++) {
      const $column = generateColumn(i);
      $(".wrapper").append($column);
    }
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
    const row6 = [];
    let boardRow = [row0, row1, row2, row3, row4, row5, row6];
    for (let i = 0; i < board.length; i++) {
      const column = board[i];
      for (let j = 0; j < column.length; j++) {
        const token = column[j];
        boardRow[j].push(token);
      }
    }
    console.log(boardRow);
    return boardRow;
  };

 
});

//////////////////////////////////////////
////////////GRAVEYARD CODE///////////////
////////////////////////////////////////
// cell5 is clicked
//cell5.shift
// cell5.unshift

//if cell is clicked, and its red, push it into the array, then render the array position
//you click in column 0,
//go to the earliest position

// horizontal
//   debugger;
//   if (
//     piece === column0[i] &&
//     piece === column1[i] &&
//     piece === column2[i] &&
//     piece === column3[i]
//   ) {
//     score++;
//     console.log(score)
//     if (score === 4) {
//       alert("winner");
//     }
// }

// if (piece === piece * 4) {
//winner
//} sort it?

// if (array.includes['red', 'red', 'red', 'red']) {
//winner
//}

// if (column === red) {
//   score++;
//   console.log("column");
//   column.shift();
//   win.push(column);
//   if (win === 4) {
//     console.log("winner");
//   }
// } else {
//   score++;
//   console.log("keep at it");
// }
// if (piece.includes([red, red, red, red])) {
//   console.log("*******", piece);
//   console.log("winner");
// } else {
//   score++;
//   console.log("keep at it");
// }
