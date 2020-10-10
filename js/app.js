$(() => {
  const $columns = $("<div>").addClass("column");
  $(".wrapper").append($columns);

  const makeSquares = () => {
    for (let i = 1; i < 4; i++) {
      const $cells = $("<div>")
        .addClass("cell")
        .addClass("cell" + i)
        .attr("size", "?") // come back
      $columns.append($cells);
    }
  };
  makeSquares();
});

// how do i make it do this 2 more times without making 2 more loops that do the same thing?
