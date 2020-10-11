$(() => {
  //function that generates a circle when clicked

  let player1 = [];
  let player2 = [];
  // siting myself here via tic-tac-toe project
  let isPlayer1 = true;
  const getPlayersTurn = () => {
    const turn = isPlayer1
      ? (player1 += generateCircle())
      : (player2 += generateCircle(true));
    isPlayer1 = !isPlayer1;
    return turn;
  };

  const generateCircle = (isYellow = false) => {
    const $circle = $("<div>").addClass("circle");
    if (isYellow) {
      $circle.addClass("yellow");
    }
    $(".cell").append($circle);
  };

  const makeSquares = ($column) => {
    for (let i = 1; i <= 7; i++) {
      const $cells = $("<div>")
        .addClass("cell")
        .addClass("cell" + i)
        .on("click", getPlayersTurn);
      $column.append($cells);
    }
  };

  const generateColumn = (index) => {
    const $column = $("<div>").addClass("column").addClass(`column${index}`);
    makeSquares($column);
    return $column;
  };
  // how do i get the circle in the column?
  const $column1 = generateColumn(1);
  const $column2 = generateColumn(2);
  const $column3 = generateColumn(3);
  const $column4 = generateColumn(4);
  const $column5 = generateColumn(5);
  const $column6 = generateColumn(6);

  $(".wrapper").append($column1);
  $(".wrapper").append($column2);
  $(".wrapper").append($column3);
  $(".wrapper").append($column4);
  $(".wrapper").append($column5);
  $(".wrapper").append($column6);

  // game logic

  // some where that holds who turn it is
  // turns will be based on clicks, when a player clicks on a square then the index of that square is pushed into an array to keep track of ?
});
