function Piece(id, options) {

  if (!id) {
    throw new Error('id must be specified');
  }

  if (!options) {
    throw new Error('options must be specified');
  }

  if (!options.board) {
    throw new Error('options.board must be specified');
  }

  if (!options.position || !options.position.x || !options.position.y) {
    throw new Error('options.position must be specified');
  }

  this.id = options.id;

  this.board = options.board;

  this.class = options.class || 'piece';

  this.size = options.size || 50;

  this.borderSize = options.borderSize || 3;

  this.position = {
    x: options.position.x,
    y: options.position.y
  };

  this.target = options.target || {
    x: this.position.x,
    y: this.position.y
  };

  this.speed = options.speed || 3;

  if (options.weapon) {
    this.weapon = options.weapon;
    this.weapon.last = 0;
  }

  this.div = $('<div>', {
    class: options.class
  });
  this.div.css('width', (this.size - 2*this.borderSize)+'px');
  this.div.css('height', (this.size - 2*this.borderSize)+'px');
  this.div.css('left', this.position.x+'px');
  this.div.css('bottom', this.position.y+'px');
  this.div.css('border-width', this.borderSize+'px');

  this.board.addPiece(id, this);

  if (options.lifespan) {
    var piece = this;
    setTimeout(function() {
      piece.deconstruct();
    }, options.lifespan);
  }

}

Piece.prototype.update = function(board) {
  var movementX = this.target.x - this.position.x;
  var movementY = this.target.y - this.position.y;
  if (movementX != 0 || movementY != 0) {
    var factor = this.speed / Math.sqrt(Math.pow(movementX, 2) + Math.pow(movementY, 2));
    if (factor < 1) {
      movementX *= factor;
      movementY *= factor;
    }
  }
  var x = this.position.x + movementX;
  x = Math.min(x, this.board.size.width - this.size/2);
  x = Math.max(x, this.size/2);
  this.position.x = x;
  var y = this.position.y + movementY;
  y = Math.min(y, this.board.size.height - this.size/2);
  y = Math.max(y, this.size/2);
  this.position.y = y;
  this.div.css('left', (this.position.x - this.size/2)+'px');
  this.div.css('bottom', (this.position.y - this.size/2)+'px');
};

Piece.prototype.deconstruct = function() {
  this.div.remove();
  board.removePiece(this);
};