function Board(options) {

  if (!options) {
    throw new Error('options must be specified');
  }

  if (!options.size || !options.size.width || !options.size.height) {
    throw new Error('options.size must be specified');
  }

  this.size = {
    width: options.size.width,
    height: options.size.height
  };

  this.div = $('<div>', {
    class: 'board'
  });
  this.div.css('width', this.size.width+'px');
  this.div.css('height', this.size.height+'px');
  $('body').append(this.div);

  this.pieces = {};

}

Board.prototype.addPiece = function(id, piece) {
  this.pieces[id] = piece;
  this.div.append(piece.div);
};

Board.prototype.removePiece = function(id) {
  delete this.pieces[id];
};

Board.prototype.update = function() {
  for (var i in this.pieces) {
    this.pieces[i].update();
  }
};