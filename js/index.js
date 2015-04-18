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

  mouse = new Mouse();

  mouse.onLeftDown(function(){
    if (!mouse.leftDownInterval) {
      mouse.leftDownInterval = setInterval(function(){
        var offset = board.div.offset();
        var x = mouse.x - offset.left;
        var y = offset.top + board.size.height - mouse.y;
        api.sendLeftClick(x, y);
      }, 40);
    }
  });

  mouse.onRightDown(function(){
    if (!mouse.rightDownInterval) {
      mouse.rightDownInterval = setInterval(function() {
        var offset = board.div.offset();
        var x = mouse.x - offset.left;
        var y = offset.top + board.size.height - mouse.y;
        api.sendRightClick(x, y);
      }, 40);
    }
  });

  mouse.onLeftUp(function(){
    clearInterval(mouse.leftDownInterval);
    mouse.leftDownInterval = false;
  });

  mouse.onRightUp(function(){
    clearInterval(mouse.rightDownInterval);
    mouse.rightDownInterval = false;
  });

});