function Camera(board) {

  if (!board) {
    throw new Error('board must be specified');
  }

  this.board = board;

}

Camera.prototype.setTarget = function(piece) {
  this.target = piece;
};

Camera.prototype.update = function() {
  if (typeof this.target == 'undefined') {
    return;
  }
  this.x = $(window).width()/2 - this.target.position.x - this.target.size/2;
  this.y = $(window).height()/2 - this.target.position.y - this.target.size/2;
  this.board.div.css('left', this.x+'px');
  this.board.div.css('bottom', this.y+'px');
};
