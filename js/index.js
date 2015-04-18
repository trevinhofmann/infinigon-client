var pieces = {};
var board;
var mouse;
var api;
var camera;

$(document).ready(function(){

  api = new Api(function(newBoard, id) {
    board = newBoard;
    camera = new Camera(board);
    camera.setTarget(board.pieces[id]);
    setInterval(function() {
      board.update();
      camera.update();
    }, 15);
  });

});