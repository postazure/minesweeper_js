var boardWidth = 30;
var boardHeight = 24;
var mineCount = 70;

createBoard(boardWidth, boardHeight);
var mines = layMines(boardWidth, boardHeight, mineCount);

$("#board").on("click", ".block", function (e) {
  var clickedBlock = $("#board div.block").index($(this));

  if (($.inArray(clickedBlock, mines) >= 0)) {
    //reveal all mines and end game
    revealMines(mines);
  }else {
    //display neighboring mine count
    var neighborMineCount = detectMines(clickedBlock);
    if (neighborMineCount > 0) {

      // $(this).css("height","18px").css("padding-bottom","2px")
      $(this).text(neighborMineCount);
    }else {
      //mass open 0 blocks
      
    }

  }

  $(this).addClass("block-clicked");
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

function revealMines(mineArray) {
  var blocks = $("#board div.block");
  for (var i = 0; i < mineArray.length; i++) {
    var mineIndex = mineArray[i];
    $(blocks[mineIndex]).addClass("mine").addClass("block-clicked");
  }
  $("#board").css("pointer-events", "none"); //freeze board
}

function detectMines(node) {
  var neighbors = [
    node - boardWidth -1, node - boardWidth,  node - boardWidth +1,
    node - 1,                                 node + 1,
    node + boardWidth -1, node + boardWidth,  node + boardWidth +1
  ];

  var minecount = 0;
  for (var i = 0; i < neighbors.length; i++) {
    if ($.inArray(neighbors[i], mines) >= 0) {
      minecount++;
    }
  }

  return minecount;
}
