var boardWidth = 30;
var boardHeight = 24;
var mineCount = 70;

createBoard(boardWidth, boardHeight);
var mines = layMines(boardWidth, boardHeight, mineCount);

$("#board").on("click", ".block", function () {
  $(this).addClass("block-clicked");
  console.log($("#board div.block").index($(this)));
  var clickedBlock = $("#board div.block").index($(this));
  if (($.inArray(clickedBlock, mines) >= 0)) { //its a mine
    //reveal all mines and end game
  }else {
    //display neighboring mine count
  }
});

function createBoard(width, height) {
  // width = 30 height = 24
  $("body").append("<div id='board'></div>");
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      $("#board").append('<div class="block"></div>');
    }
    $("#board").append("<div></div>"); //linebreak
  }
}

function layMines(width, height, mineCount) {
  var blockCount = $("div.block").length;
  var mineArray = [];
  while (mineArray.length < mineCount) {
    var selection = Math.floor(Math.random()*blockCount);
    if ($.inArray(selection, mineArray) < 0) {
      mineArray.push(selection);
    }
  }
  return mineArray;
}
