$(() => {
  //function that generates a circle when clicked
  const generateCircle = () => {
    const $circle = $("<div>").addClass("circle");
    $(".wrapper").append($circle);
    
  };

  const makeSquares = ($column) => {
    for (let i = 1; i < 6; i++) {
      const $cells = $("<div>")
        .addClass("cell")
        .addClass("cell" + i)
        .attr("size", "?"); // come back
      $column.append($cells);
    }
  };

  const generateColumn = (index) => {
    const $column = $("<div>")
      .addClass("column")
      .addClass(`column${index}`)
      .on("click", generateCircle);
    makeSquares($column);
    return $column;
  };

  const $column1 = generateColumn(1);
  const $column2 = generateColumn(2);

  $(".wrapper").append($column1);
  $(".wrapper").append($column2);
});
