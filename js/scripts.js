

var mapping = ['', 'red', 'blue'];

var board = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0]
];

var currentPlayer = "blue";

function reset() {
  board = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
  ];
  currentPlayer = "blue";
}

function setBoard() {

  // first clear the board
  $(".red").remove();
  $(".blue").remove();

  for(let i=0; i<8; ++i) {
    for(let j=0; j<8; ++j) {
      let cell = $("#" + i + j);

      switch(board[i][j]) {
        case 1:
          cell.append("<div class='piece red'>");
          break;
        case 2:
          cell.append("<div class='piece blue'>");
          break;
        case 3:
          cell.append("<div class='piece'>");
          break;
      }

    //   for (var k = 0; k < 8; k++) {
    //     if (board[0][k] === 2) {
    //       cell.append("<div class='piece blue' id='king'>");
    //     }
    // }
    }
  }

}

function validate(selectedCell, targetCell) {
  //selected
  let sr = parseInt(selectedCell.charAt(0));     //cell row
  let sc = parseInt(selectedCell.charAt(1));     //cell column

  //target
  let tr = parseInt(targetCell.charAt(0));       //cell row
  let tc = parseInt(targetCell.charAt(1));       //cell column

  let valid = false;

  if (currentPlayer === "blue") {
    if(tr === sr-1) {
      if((tc === sc+1) || (tc === sc-1)) {
        valid = true;
      }
    }
    else if(tr === sr-2) {
      if(tc === sc+2) {
        if($("#" + (sr-1) + (sc+1)).children(":first").hasClass("red")) {
          valid = true;
          board[sr-1][sc+1] = 0;
        }
      }
      else if(tc === sc-2) {
        if($("#" + (sr-1) + (sc-1)).children(":first").hasClass("red")) {
          valid = true;
          board[sr-1][sc-1] = 0;
        }
      }
    }

  }

  if (currentPlayer === "red") {
    if(tr === sr+1) {
      if((tc === sc-1) || (tc === sc+1)) {
        valid = true;
      }
    }
    else if(tr === sr+2) {
      if(tc === sc-2) {
        if($("#" + (sr+1) + (sc-1)).children(":first").hasClass("blue")) {
          valid = true;
          board[sr+1][sc-1] = 0;
        }
      }
      else if(tc === sc+2) {
        if($("#" + (sr+1) + (sc+1)).children(":first").hasClass("blue")) {
          valid = true;
          board[sr+1][sc+1] = 0;
        }
      }
    }
  }

  return valid;
}



//event.preventDefault();

$(document).ready(function() {


  var selected = false;
  var selectedCell = '';
  setBoard();

  $("#board td").click(function(e) {
    var cell = $(this).attr("id");          //clicked cell
    let row = parseInt(cell.charAt(0));     //cell row
    let column = parseInt(cell.charAt(1));  //cell column
    let piece = board[row][column];         //piece

    // Piece selection
    if((mapping[piece] === currentPlayer)) {
      $(".piece").removeClass("selected");
      $(this).children(":first").addClass("selected");
      selected = true;
      selectedCell = cell;
    }

    // move piece
    if((piece === 0) && (selected === true) && validate(selectedCell, cell)) {
      let sr = parseInt(selectedCell.charAt(0));     //cell row
      let sc = parseInt(selectedCell.charAt(1));  //cell column
      board[row][column] = board[sr][sc];
      board[sr][sc] = 0;
      setBoard();
      currentPlayer = (currentPlayer === "blue") ? "red" : "blue";
    }


  });

  $("#reset").click(function() {
    reset();
    setBoard();

  });



});
