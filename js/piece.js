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