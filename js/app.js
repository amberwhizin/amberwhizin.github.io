$(() => {
  //function that generates a circle when clicked

  const column0 = ["RED", "YELLOW"];
  const column1 = ["RED"];
  const column2 = ["YELLOW"];

  let colors = [];
  let player2 = [];
  // siting myself here via tic-tac-toe project
  let isPlayer1 = true;
  const getIsPlayer1Turn = () => {
    isPlayer1 = !isPlayer1;
    return isPlayer1;
  };

  const generateCircle = (isYellow = false) => {
    const $circle = $("<div>").addClass("circle");
    if (isYellow) {
      $circle.addClass("yellow");
    }
    return $circle;
  };

  const makeCells = ($column) => {
    for (let i = 0; i < 6; i++) {
      const $cell = $("<div>")
        .addClass("cell")
        .addClass("cell" + i)
        .on("click", () => {
          const isPlayer1Turn = getIsPlayer1Turn();
          const $circle = generateCircle(isPlayer1Turn);
          $cell.append($circle).off("click");
        });
      $column.append($cell);
    }
  };

  const generateColumn = (index) => {
    const $column = $("<div>").addClass("column").addClass(`column${index}`);
    makeCells($column);
    return $column;
  };

  for (let i = 0; i < 7; i++) {
    const $column = generateColumn(i);
    $(".wrapper").append($column);
  }

  
  // some where that holds who turn it is
  // turns will be based on clicks, when a player clicks on a square then the index of that square is pushed into an array to keep track of ?
});
