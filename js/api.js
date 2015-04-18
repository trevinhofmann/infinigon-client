function Api(callback) {

  var api = this;

  if (!callback || typeof callback != 'function') {
    throw new Error('board must be specified');
  }

  this.callback = callback;

  this.socket = io();

  this.socket.emit('join', 'free-for-all');

  this.socket.on('welcome', function(init) {
    api.handleWelcome(init, api);
  });

  this.socket.on('instantiate', function(pieces) {
    api.handleInstantiate(pieces, api.board);
  });

  this.socket.on('update', this.handleUpdate);

  this.socket.on('remove', function(pieces) {
    api.handleRemove(pieces, api.board);
  });

}

Api.prototype.sendLeftClick = function(x, y) {
  var target = {
    x: x,
    y: y
  };
  this.socket.emit('leftClick', target);
};

Api.prototype.sendRightClick = function(x, y) {
  var target = {
    x: x,
    y: y
  };
  this.socket.emit('rightClick', target);
};

Api.prototype.handleWelcome = function(init, api) {
  var options = {
    size: init.board.size
  };
  api.board = new Board(options);
  for (var i in init.pieces) {
    options = init.pieces[i];
    options.board = api.board;
    console.log(options);
    new Piece(options);
  }
  api.callback(api.board, init.id);
};

Api.prototype.handleInstantiate = function(pieces, board) {
  for (var i in pieces) {
    var options = pieces[i];
    options.board = board;
    new Piece(options);
  }
};

Api.prototype.handleUpdate = function(pieces) {
  for (var i in pieces) {
    var piece = api.board.pieces[pieces[i].id];
    piece.updateTarget(pieces[i].target);
    piece.updatePosition(pieces[i].position);
  }
};

Api.prototype.handleRemove = function(pieces, board) {
  for (var i in pieces) {
    board.pieces[pieces[i]].deconstruct();
  }
};